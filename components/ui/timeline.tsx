"use client";
import { TripInfo } from "@/app/create-new-trip/_components/ChatBox";
import { Calendar, Users, Wallet2 } from "lucide-react";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data , tripData }: { data: TimelineEntry[], tripData:TripInfo }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-7 px-4 md:px-8 lg:px-10 pt-14 ">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl ">
          Your Trip Itinerary from <strong>{tripData?.origin}</strong> to <strong>{tripData?.destination}</strong> is{" "}
          <span className="text-primary">Ready</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-start sm:items-center">
          <div className="flex gap-2 items-center">
            <Calendar className="text-primary" />
            <h2>{tripData.duration}</h2>
          </div>

          <div className="flex gap-2 items-center">
            <Wallet2 className="text-green-500" />
            <h2>{tripData.budget}</h2>
          </div>

          <div className="flex gap-2 items-center">
            <Users className="text-yellow-500" />
            <h2>{tripData.group_size}</h2>
          </div>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-start pt-10 md:gap-10 w-full"
          >
            {/* Timeline marker and title */}
            <div className="flex md:flex-col items-center md:items-start w-full md:w-[40%] relative">
              <div className="sticky top-40 flex md:flex-col items-center md:items-start">
                <div className="h-10 w-10 md:absolute left-0 md:left-8 rounded-full bg-white dark:bg-black flex items-center justify-center z-10">
                  <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-neutral-500 dark:text-neutral-400">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="pl-0 md:pl-24 pr-4 w-full">
              <h3 className="md:hidden block text-xl mb-4 font-bold text-neutral-500 dark:text-neutral-400">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Vertical line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-4 md:left-12 top-0 w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
