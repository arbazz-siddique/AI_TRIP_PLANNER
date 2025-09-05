import { ArrowBigRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Trip } from "../page";
import axios from "axios";
import Link from "next/link";

type Props={
    trip:Trip
}

function MyTripCardItem({trip}:Props) {
    const [photoUrl, setPhotoUrl] = useState<string>()
  
    const GetGooglePlaceDetail = async()=>{
      const result = await axios.post('/api/google-place-detail',{
        placeName:trip?.tripDetail?.destination
      })
      if(result?.data?.e){
        return;
      }
      setPhotoUrl(result?.data)
  
    }
  
    useEffect(()=>{
      trip && GetGooglePlaceDetail()
    },[trip])

  return (
   <Link
      href={"/view-trips/" + trip?.tripId}
      className="flex flex-col gap-3 p-4 sm:p-5 shadow-md hover:shadow-xl transition-shadow rounded-2xl bg-white dark:bg-neutral-900"
    >
      <div className="relative w-full h-60 sm:h-64 md:h-72 lg:h-80 overflow-hidden rounded-2xl">
        <Image
          src={photoUrl ? photoUrl : "/placeholder.jpg"}
          alt={trip.tripId}
          fill
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      <h2 className="flex flex-wrap items-center gap-2 font-semibold text-lg sm:text-xl md:text-2xl">
        {trip?.tripDetail?.origin} <ArrowBigRight className="w-5 h-5" />{" "}
        {trip?.tripDetail?.destination}
      </h2>

      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
        {trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget}{" "}
        <span className="text-primary">Budget💸</span>
      </p>
    </Link>
  );
}

export default MyTripCardItem;
