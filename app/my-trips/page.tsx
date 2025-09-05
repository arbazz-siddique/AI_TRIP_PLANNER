'use client'
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { ArrowBigRight, ArrowLeftRight, ChevronsUp } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useUserDetail } from '../provider';
import { TripInfo } from '../create-new-trip/_components/ChatBox';
import Image from 'next/image';
import MyTripCardItem from './_components/MyTripCardItem';

export type Trip={
  tripId:any,
  tripDetail:TripInfo,
  _id:string
}

function MyTrips() {
    const [myTrips,setMyTrips] = useState<Trip[]>([]);
    const {userDetail, setUserDetail} = useUserDetail()
    const convex = useConvex()

    useEffect(()=>{
      userDetail && GetUserTrip()
    },[userDetail])
    
    const GetUserTrip = async()=>{
      const result = await convex.query(api.tripDetail.GetUserTrip, {
        uid:userDetail?._id
      })
      setMyTrips(result)
      console.log(result)
    }
  return (
    <div className='px-4 py-6 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-48'>
      <h2 className='font-bold text-2xl sm:text-3xl lg:text-4xl'>My Trips</h2>

      {myTrips.length === 0 && (
        <div className='p-5 sm:p-7 mt-6 border rounded-2xl flex flex-col items-center justify-center gap-4 sm:gap-5'>
          <h2 className='text-center text-base sm:text-lg'>
            You don't have any trip yet, <span className='text-primary'>Create One</span>
          </h2>
          <Link href={'/create-new-trip'}>
            <Button className='flex items-center gap-2'>
              Create New Trip <ChevronsUp className='h-4 w-4 sm:h-5 sm:w-5' />
            </Button>
          </Link>
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-6'>
        {myTrips.map((trip, index) => (
          <MyTripCardItem trip={trip} key={index} />
        ))}
      </div>
    </div>
  )
}

export default MyTrips