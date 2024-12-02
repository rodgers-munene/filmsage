"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'


interface Movie{
    id: number
    title: string
    overview: string
    poster_path: string
    backdrop_path:string
}

interface DetailsCardProps {
    movieData: Movie;
}
const DetailsCard = ( { movieData }: DetailsCardProps ) => {
  const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
  
  return (
    <div>
        <div>
           {/* hero section */}
            {movieData && (
              <Image
              src={`${BACKDROP_BASE_URL}${movieData.backdrop_path}`}
              alt={movieData.title}
              height={500}
              width={500}
              >

              </Image>
            )}
        </div>
    </div>
  )
}

export default DetailsCard