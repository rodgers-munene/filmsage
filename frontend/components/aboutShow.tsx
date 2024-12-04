import React from 'react'
import Image from 'next/image'

interface Language{
  english_name: string
}

interface Movie{
  title: string
  poster_path: string
  runtime: number
  vote_count: number
  vote_average: number
  release_date: string
  spoken_languages: Language[]
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
    <div className='w-full h-screen flex flex-grow'>
        <div className='bg-white w-2/3'>

        </div>

        <div className='w-1/3 flex flex-col'>
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
                <p className='text-sm text-gray-500'>{language.english_name}</p>
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

          
        </div>
    </div>
  )
}

export default AboutShow