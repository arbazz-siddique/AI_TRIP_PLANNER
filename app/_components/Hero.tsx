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
    <div className="mt-24 w-full flex justify-center px-4 md:px-0">
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
          Hey, I'm your personal <span className="text-primary">Trip Planner</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl">
          Say where you want to go, and let AI craft your journey — flights, stays, and plans done instantly
        </p>

        {/* Input Box */}
        <div className="border rounded-2xl p-4 relative">
          <Textarea
            placeholder="Create a trip for Paris from New York"
            className="w-full h-28 sm:h-32 md:h-28 lg:h-32 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
          />
          <Button size="icon" className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6" onClick={onSend}>
            <ArrowDown01Icon className="h-4 w-4" />
          </Button>
        </div>

        {/* Suggestion List */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border rounded-full p-2 sm:p-3 cursor-pointer hover:bg-primary hover:text-white"
            >
              {suggestion.icon}
              <h2 className="text-xs sm:text-sm">{suggestion.title}</h2>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center mt-10">
          <h2 className="my-7 flex gap-2 text-center text-sm sm:text-base md:text-lg">
            Not sure where to start? <strong>See how it works</strong> <ArrowDown01Icon />
          </h2>
        </div>

        {/* Video Section */}
        <HeroVideoDialog
          className="block dark:block w-full"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qpeGHPfFyNY"
          thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
          thumbnailAlt="Hero Video"
        />
      </div>
    </div>
   
  )
}

export default Hero