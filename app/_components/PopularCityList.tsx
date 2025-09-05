"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Popular Destination to visit.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
      
    </>
  );
};

const data = [

   {
    category: "Nepal",
    title: "Mystical Himalayas – Kathmandu, Pokhara & Everest Views",
    src: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmVwYWx8ZW58MHx8MHx8fDA%3D",
    content: <DummyContent />,
  },
    {
    category: "Paris, France",
    title: "Explore the City of Lights - Eiffel Tower, Louvre & more",
    src: "https://images.unsplash.com/photo-1566555374250-e99b902bcdbc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8UGFyaXMlMkMlMjBGcmFuY2V8ZW58MHx8MHx8fDA%3D",
    content: <DummyContent />,
  },

  {
    category: "India",
    title: "Colors of Culture - Taj Mahal, Jaipur & Kerala Backwaters",
    src: "https://images.unsplash.com/photo-1515091943-9d5c0ad475af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEluZGlhfGVufDB8fDB8fHww",
    content: <DummyContent />,
  },
   {
    category: "New York, USA",
    title: "Experience NYC - Times Square, Central Park, Broadway",
    src: "https://images.unsplash.com/photo-1701750131051-8f1753498688?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TmV3JTIwWW9yayUyQyUyMFVTQXxlbnwwfHwwfHx8MA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Tokyo, Japan",
    title: "Discover Tokyo - Shibuya, Cherry Blossoms, Temples",
    src: "https://images.unsplash.com/photo-1726809348586-66f0e72d96b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
    content: <DummyContent />,
  },
  {
    category: "Rome, Italy",
    title: "Walk through History - Colosseum, Vatican, Roman Forum",
    src: "https://plus.unsplash.com/premium_photo-1661962277645-d490f3f3a941?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fFJvbWUlMkMlMjBJdGFseXxlbnwwfHwwfHx8MA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Dubai, UAE",
    title: "Luxury and Innovation - Burj Khalifa, Desert Safari",
    src: "https://images.unsplash.com/photo-1671618802338-682e248b48e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZHViYWklMjB1YWV8ZW58MHx8MHx8fDA%3D",
    content: <DummyContent />,
  },
];

