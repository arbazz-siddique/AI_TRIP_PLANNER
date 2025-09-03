import React from "react";

export const TravelInterestsOptions = [
  { id: 1, title: "Adventure", icon: "🧗", desc: "Thrilling outdoor activities" },
  { id: 2, title: "Culture", icon: "🏛️", desc: "Museums, history & traditions" },
  { id: 3, title: "Food", icon: "🍜", desc: "Local flavors & culinary tours" },
  { id: 4, title: "Nightlife", icon: "🎶", desc: "Bars, clubs & late-night fun" },
  { id: 5, title: "Relaxation", icon: "🌴", desc: "Beaches, spas & downtime" },
  { id: 6, title: "Hidden Gems", icon: "🔎", desc: "Unique offbeat experiences" },
];

function TravelInterestsUi({ onSelectedOption }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 items-center mt-1">
      {TravelInterestsOptions.map((item, index) => (
        <div
          key={index}
          className="p-3 border rounded-2xl bg-white hover:border-primary cursor-pointer flex flex-col items-center text-center"
          onClick={() => onSelectedOption(item.title + ":" + item.desc)}
        >
          <div className="text-3xl">{item.icon}</div>
          <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
          <p className="text-sm text-gray-500">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default TravelInterestsUi;
