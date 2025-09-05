"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Ellipsis, LoaderPinwheel, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import TripDurationUi from "./TripDurationUi";
import TravelInterestsUi from "./TravelInterestsUi";
import SpecialRequirementsUi from "./SpecialRequirementsUi";
import FinalUi from "./FinalUi";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTripDetail, useUserDetail } from "@/app/provider";
import {v4 as uuidv4} from 'uuid'

type Message = {
  role: string;
  content: string;
  ui?: string;
};

export type TripInfo={
  budget:string,
  destination:string,
  duration:string,
  group_size:string,
  origin:string,
  hotels:Hotel[],
  itinerary:Itinerary[]
}


export type Hotel={
  hotel_name: string;
  hotel_address: string;
  price_per_night:string;
  hotel_image_url:string;
  geo_coordinates:{
    latitude:number;
    longitude:number;
  };
  rating: number;
  description: string;
}

export type Activity = {
  place_name: string;
  place_details: string;
  place_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  place_address: string;
  ticket_pricing: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
};

export type Itinerary = {
  day: number;
  day_plan: string;
  best_time_to_visit_day: string;
  activities: Activity[];
};


const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false); 
  const [tripDetail, setTripDetail] = useState<TripInfo>()

  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail)
  const {userDetail, setUserDetail} = useUserDetail()
  // @ts-ignore
  const {tripDetailInfo, setTripDetailInfo} = useTripDetail()

  const onSend = async () => {
    if (!userInput?.trim()) return;
    setLoading(true);
    setUserInput("");
    const newMsg: Message = {
      role: "user",
      content: userInput ?? '',
    };
    setMessages((prev: Message[]) => [...prev, newMsg]);

    const result = await axios.post("/api/aimodel", {
      messages: [...messages, newMsg],
      isFinal: isFinal
    });

     console.log("Trip: ", result.data);


    !isFinal && setMessages((prev: Message[]) => [
      ...prev,
      {
        role: "assistant",
        content: result?.data?.resp,
        ui: result?.data?.ui,
      },
    ]);
   
     if(isFinal){
      setTripDetail(result?.data?.trip_plan)
      setTripDetailInfo(result?.data?.trip_plan)
      const tripId = uuidv4()
      await SaveTripDetail({
        tripDetail:result?.data?.trip_plan,
        tripId: tripId,
        uid:userDetail?._id
      })
     }
    setLoading(false);
  };

  const RenderGenerativeUi = (ui: string) => {
    if (ui == "budget") {
      // render budget ui compoenet
      return (
        <BudgetUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == "groupSize") {
      // render group size ui component
      return (
        <GroupSizeUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui === "tripDuration") {
      return (
        <TripDurationUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui === "travelInterests") {
      return (
        <TravelInterestsUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui === "specialRequirements") {
      return (
        <SpecialRequirementsUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui === "final") {
      return <FinalUi viewTrip={()=> console.log()} 
      disable={!tripDetail}
      />;
    }
    return null;
  };

  useEffect(()=>{
    const lastMsg = messages[messages.length-1]
    if(lastMsg?.ui == 'final'){
      setIsFinal(true)
      setUserInput("Ok, Great!")
     
    }
  },[messages])

  useEffect(()=>{
    if(isFinal && userInput){
       onSend()
    }
  },[isFinal])
  return (
    <div className="h-[85vh] flex flex-col border shadow-xl hover:shadow-primary rounded-2xl p-3 sm:p-5">
  {messages.length == 0 && (
    <EmptyState
      onSelectOption={(v: string) => {
        setUserInput(v);
        onSend();
      }}
    />
  )}

  {/* display message */}
  <section className="flex-1 overflow-y-auto p-2 sm:p-4">
    {messages.map((msg: Message, index) =>
      msg.role == "user" ? (
        <div className="flex justify-end mt-2" key={index}>
          <div className="max-w-[85%] sm:max-w-md md:max-w-lg bg-primary text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base">
            {msg.content}
          </div>
        </div>
      ) : (
        <div className="flex justify-start mt-2" key={index}>
          <div className="max-w-[85%] sm:max-w-md md:max-w-lg bg-gray-300 text-black px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base">
            {msg.content}
            {RenderGenerativeUi(msg.ui ?? "")}
          </div>
        </div>
      )
    )}

    {loading && (
      <div className="flex justify-start mt-2">
        <div className="max-w-[85%] sm:max-w-md md:max-w-lg bg-transparent text-black px-3 sm:px-4 py-2 rounded-lg">
          <Ellipsis className="animate-bounce " />
        </div>
      </div>
    )}
  </section>

  {/* user input */}
  <section>
    <div className="border rounded-2xl p-3 sm:p-4 relative w-full">
      <Textarea
        placeholder="Start Conversation with AI To 'Create New Trip' "
        className="w-full min-h-[60px] sm:min-h-[80px] md:min-h-[100px] bg-transparent border-none focus-visible:ring-0 shadow-none resize-y text-sm sm:text-base"
        onChange={(event) => setUserInput(event.target.value)}
        value={userInput}
      />
      <Button
        size="icon"
        className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 cursor-pointer"
        onClick={() => onSend()}
      >
        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  </section>
</div>

  );
};

export default ChatBox;
