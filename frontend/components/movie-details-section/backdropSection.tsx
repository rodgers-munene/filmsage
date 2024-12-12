import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { PlayIcon } from '@heroicons/react/20/solid'
import { useTrailer } from '@/context/TrailerDivContext'

interface Genre{
  id: number
  name: string
}

interface Movie{
    id: number
    title: string
    overview: string
    poster_path: string
    backdrop_path:string
    release_date: string
    vote_average: number
    genres: Genre[]
    runtime: number
    vote_count: number
}

interface DetailsCardProps {
    movieData: Movie;
}



const BackdropSection = ( {movieData} : DetailsCardProps ) => {
  const { toggleVisibility } = useTrailer()
 

    const formatRunTime = (minutes: number) => {
      const hours = Math.floor(minutes/60)
      const remainingMinutes = minutes % 60

      return `${hours}h ${remainingMinutes}m`
    }

    const formatVoteCount = (voteCount: number) => {
      if (voteCount >= 1000) {
        return (voteCount / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
      }
      return voteCount.toString();
    }

    const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

    const detailsButtons = ['Where to Watch', 'Trailers', 'Similar Titles']
  
    const getYear = (date: string) => {
      const newDate = new Date(date);
  
      return newDate.getFullYear()
    }
  return (
    <div>
         <div className='relative w-[calc(100vw - 50px)] h-72 flex justify-between '>
          {/* shade */}
          <div className='absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900 to-transparent z-20'></div>
            {/* movie description */}
            <div className='h-full w-1/3  flex flex-col justify-around z-30 ml-10'>

                {/* title and Year */}
              <div className='flex items-center w-full'>
                <h1 className='text-2xl text-gray-200 uppercase'> {movieData.title}</h1>
                <p className='text-gray-400 ml-2 te'>({getYear(movieData.release_date)})</p>
              </div>

              {/* Ratings and timing */}
              <div className='flex items-center absolute'>
                <div className="w-12 h-6 flex bg-yellow-500 items-center justify-center rounded-md ">
                    <span className="text-black font-bold text-xs">IMDb</span>
                </div>
                <div className='px-2'>
                    <p className='text-sm'>{movieData.vote_average.toFixed(1)} ({formatVoteCount(movieData.vote_count)}) - </p>
                </div>
                {/* genres */}
                <div className='flex flex-wrap max-w-80'>
                  {movieData.genres? movieData.genres.map((genre) => (
                    
                    <p key={genre.id} className='text-xs text-white mx-1'>{genre.name}</p>
                  )): <p className='text-sm text-white mx-1'>Undefined</p>}
                </div>
                <div className='flex'>
                  <p className='text-sm text-gray-200 mx-1'> - {formatRunTime(movieData.runtime)}</p>
                </div>
              </div>

                {/* buttons */}
              <div className='flex justify-between w-full'>
                {detailsButtons.map((btn, index) => (
                    <button key={index} className='text-gray-400 px-3 py-2 bg-gray-800 rounded-xl'>{btn}</button>
                ))}
              </div>

            </div>
              
              {/* play button */}
            <div className='absolute h-full w-1/5 flex justify-center items-center z-50 left-[40%] '>
                <button
                onClick={toggleVisibility}
                >
                  <PlayIcon className='h-16 w-16 text-red-600 rounded-full' />
                </button>
            </div>
              {/* image background */}
            <div className='relative w-1/2 h-full'>
              <div className='relative w-full h-full '>
                <Image
                src={`${BACKDROP_BASE_URL}${movieData.backdrop_path}`}
                alt={movieData.title}
                fill
                style={{ objectFit: 'fill' }}
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                >

                </Image>
              </div>

            </div>
        </div>
    </div>
  )
}

export default BackdropSection