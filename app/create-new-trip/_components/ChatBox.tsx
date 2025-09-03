"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Ellipsis, LoaderPinwheel, Send } from "lucide-react";
import React, { useState } from "react";
import EmptyState from "./EmptyState";

type Message = {
  role: string;
  content: string;
};

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSend = async () => {
    if (!userInput?.trim()) return;
    setLoading(true);
    setUserInput("");
    const newMsg: Message = {
      role: "user",
      content: userInput,
    };
    setMessages((prev: Message[]) => [...prev, newMsg]);

    const result = await axios.post("/api/aimodel", {
      messages: [...messages, newMsg],
    });
    setMessages((prev: Message[]) => [
      ...prev,
      {
        role: "assistant",
        content: result?.data?.resp,
      },
    ]);
    console.log(result.data);
    setLoading(false);
  };
  return (
    <div className="h-[85vh] flex flex-col">
        {messages.length ==0 && <EmptyState onSelectOption={(v:string)=> {setUserInput(v); onSend()}}/>}
      {/* display message */}
      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg: Message, index) =>
          msg.role == "user" ? (
            <div className="flex justify-end mt-2" key={index}>
              <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={index}>
              <div className="max-w-lg bg-gray-300 text-black px-4 py-2 rounded-lg">
                {msg.content}
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-transparent text-black px-4 py-2 rounded-lg">
              <Ellipsis className="animate-bounce " />
            </div>
          </div>
        )}
      </section>

      {/* user input */}
      <section>
        <div className="border rounded-2xl p-4 relative">
          <Textarea
            placeholder="Start Conversation with AI Or you can selection option above like 'Create New Trip' "
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
          />
          <Button
            size={"icon"}
            className="absolute bottom-6 right-6 cursor-pointer"
            onClick={() => onSend()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ChatBox;
