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
    <Link href={'/view-trips/' + trip?.tripId} className="p-5 mt-2 shadow rounded-2xl" >
      <Image
        src={ photoUrl? photoUrl : "/placeholder.jpg"}
        alt={trip.tripId}
        width={400}
        height={400}
        className="rounded-2xl object-cover w-full h-[270px]"
      />
      <h2 className="flex gap-2 font-semibold text-xl">
        {" "}
        {trip?.tripDetail?.origin} <ArrowBigRight />{" "}
        {trip?.tripDetail?.destination}
      </h2>
      <h2 className="mt-2 text-gray-500 ">{trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget} <span className="text-primary">Budget💸</span> </h2>
    </Link>
  );
}

export default MyTripCardItem;
