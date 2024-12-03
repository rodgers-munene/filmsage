"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/20/solid'


interface Movie{
    id: number
    title: string
    overview: string
    poster_path: string
    backdrop_path:string
    release_date: string
}

interface DetailsCardProps {
    movieData: Movie;
}
const DetailsCard = ( { movieData }: DetailsCardProps ) => {
  const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  const getYear = (date: string) => {
    const newDate = new Date(date);

    return newDate.getFullYear()
  }
  
  return (
    <div className='w-screen h-screen'>
      {/* movie title and year section */}
        <div className=' w-full h-48 flex items-center justify-between border-b'>
          <div className='mt-16 ml-5'>
            <h1 className='text-gray-300 text-3xl'>{movieData.title}</h1>
            <p className='text-gray-300'>{getYear(movieData.release_date)}</p>
          </div>
          <div className='mt-16 mr-5'>
            <button>
                <XMarkIcon className='h-10 w-10' />
            </button>
          </div>
        </div>

      {/* movie description, play button and image */}
        <div className='w-full h-auto'>
              {/* image background */}
            <div className='w-full h-72'>
              <div className='w-40 h-32 border'>

              </div>


            </div>
        </div>
    </div>
  )
}

export default DetailsCard