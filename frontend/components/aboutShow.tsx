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
    <div className='w-full h-auto flex flex-grow'>
        {/* left section */}
        <div className='w-2/3'>
          <MovieProviders data={data}/>
          <MovieSynopsis data={data} />
        </div>

        {/* right section */}
        <div className='w-1/3 flex flex-col'>
        {/* about movie and movie poster */}
          <div className='w-full h-72 flex'>
            <div className='w-1/2 h-full pl-3 pt-4'>
             <h1 className='uppercase text-lg'>About the Movie</h1>
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
             {data.spoken_languages? data.spoken_languages.map((language, index) => (
                <p key={index} className='text-sm text-gray-500'>{language.english_name}</p>
             )): <p>Unknown</p> }
            </div>

            {/* poster image */}
            <div className='w-1/2 h-full flex justify-start items-center'>
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
          <div className='w-full grid grid-cols-2 gap-6 justify-around mt-5'>
            <button className='w-44 h-12 bg-gray-600 flex justify-center items-center rounded-md'><HandThumbUpIcon className='h-7 w-7' /></button>
            <button className='w-44 h-12 bg-gray-600 flex justify-center items-center rounded-md'><HandThumbDownIcon className='h-7 w-7'/></button>
            <button className='w-44 h-12 bg-gray-600 flex justify-center items-center rounded-md'><HeartIcon className='h-7 w-7'/><span className='ml-1'>Favorite</span></button>
            <button className='w-44 h-12 bg-gray-600 flex justify-center items-center rounded-md'><CheckIcon className='h-7 w-7'/><span className='ml-1'> Seen</span></button>
            <button className='w-[26rem] col-span-2 bg-gray-600 h-12 rounded-md'>Sign In to Sync Watchlist</button>
          </div>

             {/* genres */}
          <div className='relative mt-7 w-full'>
            <hr className='absolute w-[93%] border-gray-600 top-0'/>
            <div className='h-24 flex flex-col justify-center'>
              <h1 className='uppercase text-gray-400'>Genres</h1>
              <div className='flex w-1/2 ' >
                {data.genres? data.genres.map((genre) => (
                  <p key={genre.id} className='mr-2 text-sm text-gray-300'>{genre.name}</p>
                )): <p>Unknown</p>}
              </div>
            </div>


          </div>

          {/* runtime */}
          <div className='relative w-full'>
            <hr className='absolute w-[93%] top-0 border-gray-600'/>
            <div className='h-24 flex flex-col justify-center'>
              <h1 className='uppercase text-gray-400'>Runtime</h1>
              <p className='text-sm text-gray-300'>{formatRunTime(data.runtime)}</p>
            </div>
          </div>

          {/* Language*/}
          <div className='relative w-full'>
            <hr className='absolute w-[93%] top-0 border-gray-600'/>
            <div className='h-24 flex flex-col justify-center'>
              <h1 className='uppercase text-gray-400'>Languages</h1>
              <div>
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