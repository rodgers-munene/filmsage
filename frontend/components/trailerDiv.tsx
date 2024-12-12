import React, { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useTrailer } from '@/context/TrailerDivContext'

interface Movie{
  id: number
  title: string
}

interface TrailerDivProps{
  data: Movie;
}

const TrailerDiv = ( {data}: TrailerDivProps ) => {
  const {visibility, toggleVisibility } = useTrailer()
 
  
  return (
   <div>
     {visibility && (
      <div className={`absolute w-3/4 h-3/4 bg-gray-800 top-20 left-44 z-50 rounded-lg `}>
      <div className='w-full h-10 flex items-center justify-between'>
        <h1 className='text-2xl text-gray-200 ml-3'>{data.title}</h1>
        <button
        onClick={toggleVisibility}
         className='mr-3'>
            <XMarkIcon className='h-10 w-10' />
        </button>
        
      </div>
    </div>
     )}

   </div>
  )
}

export default TrailerDiv