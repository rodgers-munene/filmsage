import React from 'react'
import Image from 'next/image'
import { PlayIcon } from '@heroicons/react/20/solid'



interface Movie{
    id: number
    title: string
    overview: string
    poster_path: string
    backdrop_path:string
    release_date: string
    vote_average: number
}

interface DetailsCardProps {
    movieData: Movie;
}

const BackdropSection = ( {movieData} : DetailsCardProps ) => {

    const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

    const detailsButtons = ['Where to Watch', 'Trailers', 'Similar Titles']
  
    const getYear = (date: string) => {
      const newDate = new Date(date);
  
      return newDate.getFullYear()
    }
  return (
    <div>
         <div className='relative w-[calc(100vw - 50px)] h-72 flex justify-around bg-gray-900 '>
            {/* movie description */}
            <div className='h-full w-1/3  flex flex-col justify-around'>

                {/* title and Year */}
              <div className='flex items-center w-full'>
                <h1 className='text-2xl text-gray-400'> {movieData.title}</h1>
                <p className='text-gray-400 ml-2 te'>({getYear(movieData.release_date)})</p>
              </div>

              {/* Ratings and timing */}
              <div className='flex items-center'>
                <div className="w-12 h-6 flex bg-yellow-500 items-center justify-center rounded-md ">
                    <span className="text-black font-bold text-xs">IMDb</span>
                </div>
                <div className='px-2'>
                    <p>{movieData.vote_average}</p>
                </div>
              </div>

                {/* buttons */}
              <div className='flex justify-between w-full'>
                {detailsButtons.map((btn) => (
                    <button className='text-gray-400 px-3 py-2 bg-gray-800 rounded-xl'>{btn}</button>
                ))}
              </div>

            </div>

            <div className='absolute h-full w-1/5 flex justify-center items-center z-10'>
                <button>
                  <PlayIcon className='h-16 w-16 text-red-600 rounded-full' />
                </button>
            </div>
              {/* image background */}
            <div className='w-1/2 h-full'>
              <div className='relative w-full h-full '>
                <Image
                src={`${BACKDROP_BASE_URL}${movieData.backdrop_path}`}
                alt={movieData.title}
                fill
                objectFit='fill'
                >

                </Image>
              </div>


            </div>
        </div>
    </div>
  )
}

export default BackdropSection