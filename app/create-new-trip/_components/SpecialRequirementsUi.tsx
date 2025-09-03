import React from "react";

export const SpecialRequirementsOptions = [
  { id: 1, title: "Pet-Friendly", icon: "🐾", desc: "Accommodation & activities for pets" },
  { id: 2, title: "Accessibility", icon: "♿", desc: "Wheelchair-friendly options" },
  { id: 3, title: "Vegetarian", icon: "🥗", desc: "Veggie & vegan-friendly meals" },
  { id: 4, title: "Photography", icon: "📸", desc: "Scenic spots & photo tours" },
  { id: 5, title: "Kids-Friendly", icon: "🎠", desc: "Activities suitable for children" },
];

function SpecialRequirementsUi({ onSelectedOption }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 items-center mt-1">
      {SpecialRequirementsOptions.map((item, index) => (
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

export default SpecialRequirementsUi;
