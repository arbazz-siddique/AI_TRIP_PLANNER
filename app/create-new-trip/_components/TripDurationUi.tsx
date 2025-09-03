import React from "react";

export const TripDurationOptions = [
  { id: 1, title: "Weekend", desc: "2-3 days for a quick escape", icon: "⏳" },
  { id: 2, title: "Short", desc: "4-6 days to see the highlights", icon: "📅" },
  { id: 3, title: "Standard", desc: "7-10 days for a balanced trip", icon: "🗓️" },
  { id: 4, title: "Extended", desc: "10+ days to explore in-depth", icon: "🌍" },
];

function TripDurationUi({ onSelectedOption }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1">
      {TripDurationOptions.map((item, index) => (
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

export default TripDurationUi;
