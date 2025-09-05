import { suggestions } from '@/app/_components/Hero'
import React from 'react'

const EmptyState = ({onSelectOption}:any) => {
  return (
    <div className="mt-8 sm:mt-10 px-4 sm:px-6 lg:px-8 h-[400px] sm:h-[500px] md:h-[200px] lg:h-[620px]">
      <h2 className="font-bold text-xl sm:text-2xl text-center leading-snug">
        Start Planning Your Next{' '}
        <strong className="text-primary">Adventure with AI</strong>
      </h2>

      <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
        Discover hidden gems, top stays, and unique experiences — all tailored
        to your budget with the power of AI.
      </p>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-5">
        {suggestions.map((suggestion, index) => (
          <div
            onClick={() => onSelectOption(suggestion.title)}
            key={index}
            className="flex items-center gap-2 border rounded-xl px-3 py-2 text-xs sm:text-sm cursor-pointer hover:border-primary hover:text-primary transition"
          >
            {suggestion.icon}
            <h2>{suggestion.title}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmptyState