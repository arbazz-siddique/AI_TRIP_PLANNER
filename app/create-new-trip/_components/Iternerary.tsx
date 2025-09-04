"use client";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  LucideTimer,
  Star,
  Ticket,
  Wallet2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HotelCardItem from "./HotelCardItem";
import PlaceCardItem from "./PlaceCardItem";
import { useTripDetail } from "@/app/provider";
import { TripInfo } from "./ChatBox";

// const TRIP_DATA = {
//   destination: "Bengaluru",
//   duration: "2-3 days",
//   origin: "Goa",
//   budget: "Budget-Friendly",
//   group_size: "1 person",
//   hotels: [
//     {
//       hotel_name: "Bloomrooms @ Indiranagar",
//       hotel_address:
//         "717, Chinmaya Mission Hospital Rd, Stage 1, Indiranagar, Bengaluru, Karnataka 560038, India",
//       price_per_night: "$30-$40",
//       hotel_image_url: "https://example.com/bloomrooms_indiranagar.jpg",
//       geo_coordinates: {
//         latitude: 12.9716,
//         longitude: 77.6412,
//       },
//       rating: 4,
//       description:
//         "A budget-friendly hotel in a prime location, offering clean and comfortable rooms.",
//     },
//     {
//       hotel_name: "Zostel Bengaluru",
//       hotel_address:
//         "No. 13/1, Hutchins Road, Cooke Town, Bangalore, Karnataka 560084",
//       price_per_night: "$10-$15 (Dorm)",
//       hotel_image_url: "https://example.com/zostel_bengaluru.jpg",
//       geo_coordinates: {
//         latitude: 12.9957,
//         longitude: 77.6254,
//       },
//       rating: 4.2,
//       description:
//         "A popular hostel providing budget accommodation, a social atmosphere, and travel assistance.",
//     },
//     {
//       hotel_name: "The Hosteller Bangalore",
//       hotel_address:
//         "Opposite Madiwala Lake, 7th Cross, BTM Layout 2nd Stage, Bengaluru, Karnataka 560076, India",
//       price_per_night: "$12-$18 (Dorm)",
//       hotel_image_url: "https://example.com/thehosteller_bangalore.jpg",
//       geo_coordinates: {
//         latitude: 12.9141,
//         longitude: 77.6169,
//       },
//       rating: 4.3,
//       description:
//         "Modern hostel with both private rooms and dorms. Known for its clean facilities and friendly staff.",
//     },
//   ],
//   itinerary: [
//     {
//       day: 1,
//       day_plan:
//         "Arrival in Bengaluru, explore historical sites, and enjoy local food.",
//       best_time_to_visit_day: "Morning to evening",
//       activities: [
//         {
//           place_name: "Bangalore Fort",
//           place_details:
//             "A historical fort built and rebuilt by various rulers, showcasing different architectural styles.",
//           place_image_url: "https://example.com/bangalore_fort.jpg",
//           geo_coordinates: {
//             latitude: 12.9613,
//             longitude: 77.5833,
//           },
//           place_address: "KR Market, Bengaluru, Karnataka 560002, India",
//           ticket_pricing: "Free",
//           time_travel_each_location: "N/A (starting point)",
//           best_time_to_visit: "Morning (10:00 AM - 12:00 PM)",
//         },
//         {
//           place_name: "Tipu Sultan's Summer Palace",
//           place_details:
//             "An exquisite wooden structure that served as the summer residence of Tipu Sultan.",
//           place_image_url: "https://example.com/tipu_palace.jpg",
//           geo_coordinates: {
//             latitude: 12.9577,
//             longitude: 77.5836,
//           },
//           place_address:
//             "Tipu Sultan Palace Rd, Chamrajpet, Bengaluru, Karnataka 560018, India",
//           ticket_pricing: "$1",
//           time_travel_each_location:
//             "10 minutes by auto-rickshaw from Bangalore Fort",
//           best_time_to_visit: "Afternoon (2:00 PM - 4:00 PM)",
//         },
//         {
//           place_name: "KR Market",
//           place_details:
//             "A vibrant and bustling market, perfect for experiencing local life and street food.",
//           place_image_url: "https://example.com/kr_market.jpg",
//           geo_coordinates: {
//             latitude: 12.965,
//             longitude: 77.585,
//           },
//           place_address: "Market Square, Bengaluru, Karnataka 560002, India",
//           ticket_pricing: "Free",
//           time_travel_each_location:
//             "5 minutes by walk from Tipu Sultan's Summer Palace",
//           best_time_to_visit: "Late afternoon/Evening (4:00 PM - 6:00 PM)",
//         },
//       ],
//     },
//     {
//       day: 2,
//       day_plan:
//         "Adventure activities, exploring nature, and experiencing the nightlife.",
//       best_time_to_visit_day: "Full day",
//       activities: [
//         {
//           place_name: "Nandi Hills",
//           place_details:
//             "A hill station near Bengaluru, known for its scenic views and historical significance, ideal for hiking and sunrise viewing.",
//           place_image_url: "https://example.com/nandi_hills.jpg",
//           geo_coordinates: {
//             latitude: 13.3667,
//             longitude: 77.6833,
//           },
//           place_address: "Nandi Hills, Chikkaballapur, Karnataka, India",
//           ticket_pricing: "$2 (entry fee)",
//           time_travel_each_location: "2 hours by bus/car from Bengaluru",
//           best_time_to_visit: "Early Morning (6:00 AM - 9:00 AM) for sunrise",
//         },
//         {
//           place_name: "Microlight Flying at Jakkur Aerodrome",
//           place_details:
//             "Take a thrilling microlight flight for a unique aerial view of Bangalore.",
//           place_image_url: "https://example.com/jakkur_aerodrome.jpg",
//           geo_coordinates: {
//             latitude: 13.077,
//             longitude: 77.6017,
//           },
//           place_address:
//             "Bellary Road, Jakkur, Bengaluru, Karnataka 560064, India",
//           ticket_pricing: "$50-$80",
//           time_travel_each_location:
//             "1 hour 30 minutes by car from Nandi Hills",
//           best_time_to_visit: "Late morning/Afternoon (11:00 AM - 1:00 PM)",
//         },
//         {
//           place_name: "Toit Brewpub",
//           place_details:
//             "A popular brewery in Indiranagar offering a wide variety of craft beers and a lively atmosphere.",
//           place_image_url: "https://example.com/toit_brewpub.jpg",
//           geo_coordinates: {
//             latitude: 12.9749,
//             longitude: 77.6407,
//           },
//           place_address:
//             "298, Namma Metro Pillar 62, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038, India",
//           ticket_pricing: "$20-$30 (drinks and food)",
//           time_travel_each_location: "45 minutes by car from Jakkur Aerodrome",
//           best_time_to_visit: "Evening/Night (8:00 PM onwards)",
//         },
//       ],
//     },
//     {
//       day: 3,
//       day_plan: "Visit museums, relax in gardens, and depart from Bengaluru.",
//       best_time_to_visit_day: "Morning and Afternoon",
//       activities: [
//         {
//           place_name: "Visvesvaraya Industrial & Technological Museum",
//           place_details:
//             "A science museum showcasing various scientific principles and technological advancements.",
//           place_image_url: "https://example.com/visvesvaraya_museum.jpg",
//           geo_coordinates: {
//             latitude: 12.9786,
//             longitude: 77.5998,
//           },
//           place_address: "Kasturba Road, Bengaluru, Karnataka 560001, India",
//           ticket_pricing: "$2",
//           time_travel_each_location: "N/A (Starting point for Day 3)",
//           best_time_to_visit: "Morning (10:00 AM - 12:00 PM)",
//         },
//         {
//           place_name: "Lal Bagh Botanical Garden",
//           place_details:
//             "A sprawling botanical garden with a wide variety of plants, a lake, and a glasshouse, perfect for a relaxing stroll.",
//           place_image_url: "https://example.com/lalbagh_garden.jpg",
//           geo_coordinates: {
//             latitude: 12.9516,
//             longitude: 77.5934,
//           },
//           place_address: "Lal Bagh, Bengaluru, Karnataka 560004, India",
//           ticket_pricing: "$0.50",
//           time_travel_each_location:
//             "20 minutes by auto-rickshaw from the museum",
//           best_time_to_visit: "Afternoon (2:00 PM - 4:00 PM)",
//         },
//       ],
//     },
//   ],
// };

function Iternerary() {
  // @ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  const [tripData, setTripData] = useState<TripInfo | null>(null);

  useEffect(() => {
    tripDetailInfo && setTripData(tripDetailInfo);
  }, [tripDetailInfo]);

  const data = tripData
    ? [
        {
          title: "Hotels",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              {tripData?.hotels.map((hotel, index) => (
                <HotelCardItem key={hotel.hotel_name} hotel={hotel} />
              ))}
            </div>
          ),
        },
        ...tripData?.itinerary.map((dayData) => ({
          title: `Day ${dayData?.day}`,
          content: (
            <div className="">
              <p>
                {" "}
                <strong>Best Time</strong> :{" "}
                <strong className="text-primary">
                  {" "}
                  <em> {dayData?.best_time_to_visit_day}</em>{" "}
                </strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                {dayData?.activities.map((activity, index) => (
                  <PlaceCardItem
                    key={activity.place_name}
                    activity={activity}
                  />
                ))}
              </div>
            </div>
          ),
        })),
      ]
    : [];
  return (
    <div className="relative w-full h-[83vh] overflow-auto ">
      {tripData ? (
        <Timeline data={data} tripData={tripData} />
      ) : (
        <div>
          <h2 className="flex gap-2 items-center absolute bottom-10 text-3xl text-white left-20">
            {" "}
            <span className="text-primary flex gap-2 items-center">
              <ArrowLeft size={32} /> Getting
            </span>{" "}
            to know you to build perfect trip here...
          </h2>
          <Image
            src={"/travel.png"}
            alt="travel"
            width={"800"}
            height={"800"}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      )}
    </div>
  );
}

export default Iternerary;
