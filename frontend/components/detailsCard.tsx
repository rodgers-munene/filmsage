"use client"

import React, { useEffect, useState } from 'react'
import { XMarkIcon} from '@heroicons/react/20/solid'
import BackdropSection from './backdropSection'
import AboutShow from './aboutShow'


interface Movie{
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path:string
  release_date: string
  vote_average: number
  genres: number[]
  runtime: number
  vote_count: number
}

interface DetailsCardProps {
    movieData: Movie;
}
const DetailsCard = ( { movieData }: DetailsCardProps ) => {

  const getYear = (date: string) => {
    const newDate = new Date(date);

    return newDate.getFullYear()
  }
  
  return (
    <div className='w-screen h-screen'>
      {/* movie title and year section */}
        <div className=' w-full h-36 flex items-center justify-between '>
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
      <BackdropSection movieData={movieData} />
      <AboutShow />
       
    </div>
  )
}

export default DetailsCard