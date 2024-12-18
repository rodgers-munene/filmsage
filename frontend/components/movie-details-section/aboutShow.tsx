import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HandThumbUpIcon, HandThumbDownIcon, HeartIcon, CheckIcon } from '@heroicons/react/20/solid'
import MovieProviders from './movieProviders'
import MovieSynopsis from './movieSynopsis'

interface Language{
  english_name: string
}

interface Genre {
  id: number
  name: string
}

interface Movie{
  id: number
  title: string
  poster_path: string
  runtime: number
  vote_count: number
  vote_average: number
  release_date: string
  spoken_languages: Language[]
  overview: string
  genres: Genre[]
}

interface AboutSectionProps {
  data: Movie;
}

const AboutShow = ( { data } : AboutSectionProps)  => {

  const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  const formatYear = (date: string) => {
    const newDate = new Date(date);
    return newDate.getFullYear()
  }

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

  

  return (
    <div className='w-full h-auto flex justify-center flex-col lg:flex-row items-center'>
        {/* left section */}
        <div className='w-[90%] lg:w-[62%]'>
          <MovieProviders data={data}/>
          <MovieSynopsis data={data} />
        </div>

        {/* right section */}
        <div className='max-xs:w-full w-[90%] lg:w-[32%] flex flex-col'>
        {/* about movie and movie poster */}
          <div className='w-full h-72 max-xs:h-64 flex justify-center'>
            <div className='w-[45%] h-full pl-3 pt-4'>
             <h1 className='uppercase text-lg max-xs:text-xs'>About the Movie</h1>
             <div className='flex py-2'>
                <div className="w-12 h-6 flex bg-yellow-500 items-center justify-center rounded-md ">
                    <span className="text-black font-bold text-xs">IMDb</span>
                </div>
                <div className='px-2'>
                    <p className='text-sm text-gray-500'>{data.vote_average.toFixed(1)} ({formatVoteCount(data.vote_count)})</p>
                </div>
             </div>
             <p className='py-2 text-gray-500'>{formatRunTime(data.runtime)}</p>
             <p className='py-2 text-gray-500'>{formatYear(data.release_date)}</p>
             {/* languages */}
             <div className='flex flex-wrap'>
             {data.spoken_languages? data.spoken_languages.map((language, index) => (
                <p key={index} className='text-sm text-gray-500 mr-1'>{language.english_name}</p>
             )): <p>Unknown</p> }
             </div>
            </div>

            {/* poster image */}
            <div className='w-[45%] h-full flex justify-center items-start sm:items-center max-xs:pt-4'>
              <Image
              src={data.poster_path? `${BACKDROP_BASE_URL}${data.poster_path}`: "/default_image.png" }
              alt={data.title}
              width={170}
              height={80}
              priority
              className='rounded-lg'
              ></Image>
            </div>
          </div>

          {/* buttons */}
          <div className='w-full flex justify-center '>
            <div className='w-[90%] grid grid-cols-2 gap-8 justify-between mt-5'>
              <button className=' h-12 bg-gray-600 flex justify-center items-center rounded-md'><HandThumbUpIcon className='h-7 w-7' /></button>
              <button className=' h-12 bg-gray-600 flex justify-center items-center rounded-md'><HandThumbDownIcon className='h-7 w-7'/></button>
              <button className=' h-12 bg-gray-600 flex justify-center items-center rounded-md'><HeartIcon className='h-7 w-7'/><span className='ml-1'>Favorite</span></button>
              <button className=' h-12 bg-gray-600 flex justify-center items-center rounded-md'><CheckIcon className='h-7 w-7'/><span className='ml-1'> Seen</span></button>
              <button className='col-span-2 bg-gray-600 h-12 rounded-md'>Sign In to Sync Watchlist</button>
            </div>
          </div>

             {/* genres */}
          <div className='relative mt-7 w-full'>
            <hr className='absolute w-full border-gray-600 top-0'/>
            <div className='h-24 flex flex-col justify-center pl-4'>
              <h1 className='uppercase text-gray-400'>Genres</h1>
              <div className='flex flex-wrap' >
                {data.genres? data.genres.map((genre) => (
                  <p key={genre.id} className='mr-2 text-sm text-gray-300'>{genre.name}</p>
                )): <p>Unknown</p>}
              </div>
            </div>


          </div>

          {/* runtime */}
          <div className='relative w-full'>
            <hr className='absolute w-full top-0 border-gray-600'/>
            <div className='h-24 flex flex-col justify-center pl-4'>
              <h1 className='uppercase text-gray-400'>Runtime</h1>
              <p className='text-sm text-gray-300'>{formatRunTime(data.runtime)}</p>
            </div>
          </div>

          {/* Language*/}
          <div className='relative w-full'>
            <hr className='absolute w-full top-0 border-gray-600'/>
            <div className='h-24 flex flex-col justify-center pl-4'>
              <h1 className='uppercase text-gray-400'>Languages</h1>
              <div className='flex flex-wrap'>
              {data.spoken_languages? data.spoken_languages.map((language, index) => (
                  <p key={index} className='text-sm text-gray-300 mr-2'>{language.english_name}</p>
              )): <p className='text-sm text-gray-400'>Unknown</p> }
              </div>
            </div>
          </div>

          
        </div>
    </div>
  )
}

export default AboutShow