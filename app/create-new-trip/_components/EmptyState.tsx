import { suggestions } from '@/app/_components/Hero'
import React from 'react'

const EmptyState = ({onSelectOption}:any) => {
  return (
    <div className='mt-10'>
        <h2 className='font-bold text-2xl text-center'>
  Start Planning Your Next <strong className='text-primary'>Adventure with AI</strong>
</h2>
<p className='mt-3 text-center text-gray-600 max-w-2xl mx-auto'>
  Discover hidden gems, top stays, and unique experiences — all tailored to your budget with the power of AI.
</p>

<div className='flex gap-3 mt-5'>
            {suggestions.map((suggestion, index)=>(
                <div onClick={()=>onSelectOption(suggestion.title)} key={index} className='flex items-center gap-2 border text-sm rounded-xl p-1 cursor-pointer hover:border-primary hover:text-primary'>
                    {suggestion.icon}
                    <h2 className='text-sm'>{suggestion.title}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EmptyState