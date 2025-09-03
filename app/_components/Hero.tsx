'use client'
import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { ArrowDown01Icon, ArrowDownIcon, Globe2, Landmark, Plane, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'


export const suggestions=[
    {
        title:'Create New Trip',
        icon: <Globe2 className='text-blue-400 h-5 w-5'/>
    },
    {
        title:'Inspire me where to go',
        icon: <Plane className='text-green-400 h-5 w-5'/>
    },
    {
        title:'Discover Hidden gems',
        icon: <Landmark className='text-orange-400 h-5 w-5'/>
    },
    {
        title:'Adventure Destination',
        icon: <Globe2 className='text-yellow-400 h-5 w-5'/>
    },
   
]

const Hero = () => {

    const {user} = useUser()
    const router = useRouter();
    const onSend=()=>{
        if(!user){
            router.push('/sign-in')
            return ;
        }
        // naviations
        router.push('/create-new-trip')
    }

  return (
    <div className='mt-24 w-full flex justify-center '>
        {/* content */}
        <div className='max-w-3xl w-full text-center space-y-6 '>
            <h1 className='text-xl md:text-5xl font-bold' >Hey, I'm your personal <span className='text-primary'>Trip Planner</span></h1>
            <p className='text-lg'>Say where you want to go, and let AI craft your journey — flights, stays, and plans done instantly</p>
        {/* input box */}
        <div>
            <div className='border rounded-2xl p-4 relative'>
                <Textarea placeholder='Create a trip for parise from new york' className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none' />
                <Button size={'icon'} className='absolute bottom-6 right-6 cursor-pointer' onClick={()=>onSend()} >
                    <Send className='h-4 w-4'/>
                </Button>
            </div>
        </div>
        {/* suggestion list */}

        <div className='flex gap-5'>
            {suggestions.map((suggestion, index)=>(
                <div key={index} className='flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white'>
                    {suggestion.icon}
                    <h2 className='text-sm'>{suggestion.title}</h2>
                </div>
            ))}
        </div>

            <div className='flex items-center justify-center flex-col'>
        <h2 className='my-7 mt-14 flex gap-2 text-center'>Not sure where to start? <strong>See how it works</strong> <ArrowDown01Icon/> </h2>
            </div>

        {/* video section */}
 <HeroVideoDialog
        className="block dark:block"
        animationStyle="from-center"
        videoSrc="https://www.example.com/dummy-video"
        thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
        thumbnailAlt="Hero Video"
      />
        </div>
    </div>
  )
}

export default Hero