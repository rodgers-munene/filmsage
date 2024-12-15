"use client"

import React, { useEffect, useState } from 'react'
import { XMarkIcon} from '@heroicons/react/20/solid'
import BackdropSection from './backdropSection'
import AboutShow from './aboutShow'
import TrailerDiv from './trailerDiv'
import ExtraMovies from '././extraMovies'
import { useRouter } from 'next/navigation'

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
  overview: string
  poster_path: string
  backdrop_path:string
  release_date: string
  vote_average: number
  genres: Genre[]
  runtime: number
  vote_count: number
  spoken_languages: Language[]
}

interface DetailsCardProps {
    movieData: Movie;
}
const DetailsCard = ( { movieData }: DetailsCardProps ) => {
  const movieGenres = movieData.genres.map((genre) => (
          genre.id
      ))
  

  const router = useRouter()

  const getYear = (date: string) => {
    const newDate = new Date(date);

    return newDate.getFullYear()
  }
  
  return (
    <div className='relative w-screen h-screen'>
      {/* movie title and year section */}
        <div className=' w-full h-36 flex items-center justify-between '>
          <div className='mt-16 ml-5'>
            <h1 className='text-gray-300 text-3xl'>{movieData.title}</h1>
            <p className='text-gray-300'>{getYear(movieData.release_date)}</p>
          </div>
          <div className='mt-16 mr-5'>
            <button
            onClick={() => router.back()}
            >
                <XMarkIcon className='h-10 w-10' />
            </button>
          </div>
        </div>

      {/* movie description, play button and image */}
      <BackdropSection movieData={movieData} />
      <TrailerDiv data={movieData}/> 
      <AboutShow data={movieData}/>
      <ExtraMovies title={`People Who Liked ${movieData.title} also Liked`} data={movieData} propInput={movieData.id}/>
      <ExtraMovies title='Recommendations' data={movieData} propInput={movieGenres}/>
    </div>
  )
}

export default DetailsCard