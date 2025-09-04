'use client'
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, Ticket, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Activity } from "./ChatBox";
import axios from "axios";

type Props = {
  activity: Activity;
};

function PlaceCardItem({ activity }: Props) {

  const [photoUrl, setPhotoUrl] = useState<string>()
  
    const GetGooglePlaceDetail = async()=>{
      const result = await axios.post('/api/google-place-detail',{
        placeName:activity?.place_name + ":" + activity?.place_address
      })
      if(result?.data?.e){
        return;
      }
      setPhotoUrl(result?.data)
  
    }
  
    useEffect(()=>{
      activity && GetGooglePlaceDetail()
    },[activity])

  return (
    <div className="flex flex-col rounded-2xl shadow-md hover:shadow-primary transition overflow-hidden h-full">
      {/* Image */}
      <Image
        src={photoUrl ? photoUrl : "/placeholder.jpg"}
        width={400}
        height={200}
        alt={activity?.place_name || "Activity image"}
        className="object-cover h-48 w-full"
      />

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="font-semibold text-lg text-gray-800">
          {activity.place_name}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-2">
          {activity.place_details}
        </p>

        {/* Ticket + Best Time */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-2">
          <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-lg text-sm">
            <Ticket size={16} /> {activity.ticket_pricing}
          </span>
          <span className="flex items-center gap-1 text-purple-600 bg-purple-50 px-2 py-1 rounded-lg text-sm">
            <Clock size={16} /> {activity.best_time_to_visit}
          </span>
        </div>

        {/* Button pinned at bottom */}
        <div className="mt-auto">
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${activity?.place_name}`}
            target="_blank"
          >
            <Button
              size="sm"
              variant="outline"
              className="w-full hover:bg-primary hover:text-white transition"
            >
              View <ExternalLink size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlaceCardItem;
