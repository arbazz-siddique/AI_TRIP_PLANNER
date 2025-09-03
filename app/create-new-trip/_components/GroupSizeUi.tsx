import React from "react";

export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "Embark on a soul-refreshing solo adventure full of freedom and discovery.",
    icon: "🌍",
    people: "1 person",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "A romantic getaway designed for two hearts exploring together.",
    icon: "💑",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "Create lasting memories with a fun-filled family vacation for all ages.",
    icon: "👨‍👩‍👧‍👦",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "An exciting group trip packed with laughter, adventure, and shared stories.",
    icon: "🎉",
    people: "5 to 10 people",
  },
];

function GroupSizeUi({onSelectedOption}:any){
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1">
            {SelectTravelesList.map((item,index)=>(
                <div key={index} className="p-3 border rounded-2xl bg-white hover:border-primary cursor-pointer"
                onClick={()=>onSelectedOption(item.title+":"+item.people)}
                >
                    <h2>{item.icon}</h2>
                    <h2>{item.title}</h2>
                </div>
            ))}
        </div>
    )
}

export default GroupSizeUi;
