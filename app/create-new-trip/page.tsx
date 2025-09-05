"use client";
import React, { useState } from "react";
import ChatBox from "./_components/ChatBox";
import Iternerary from "./_components/Iternerary";
import GlobalMap from "./_components/GlobalMap";
import { Button } from "@/components/ui/button";
import { Globe2, Plane } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CreateNewTrip = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 p-4 sm:p-6 lg:p-10">
      {/* Chatbox (left side) */}
      <div className="col-span-1 md:col-span-2 order-1">
        <ChatBox />
      </div>

      {/* Map / Itinerary (right side) */}
      <div className="col-span-1 md:col-span-3 order-2 relative">
        {activeIndex === 0 ? (
          <Iternerary />
        ) : (
          <GlobalMap autoRotate autoRotateSpeed={0.6} />
        )}

        {/* Toggle Button */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 
                bottom-6 sm:bottom-10 md:bottom-12 lg:bottom-16"
        >
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={() => setActiveIndex(activeIndex === 0 ? 1 : 0)}
                size="lg"
                className="rounded-full shadow-lg bg-black"
              >
                {activeIndex === 0 ? <Plane /> : <Globe2 />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Trip between map and trip</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CreateNewTrip;
