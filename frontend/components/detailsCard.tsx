"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchConfig } from '@/lib/data'


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
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const [imageConfig, setImageConfig] = useState()

  useEffect(() =>{
    const getData = async () =>{
        const imageConfig = await fetchConfig()

        setImageConfig(imageConfig)
    }

    console.log("image: ", getData())
  }, [])
  return (
    <div>
        <div>
            <Image
            src={`${IMAGE_BASE_URL}${movieData.backdrop_path}`}
            alt={movieData.title}
            fill
            objectFit=''
            priority
            >

            </Image>
            <div>
            </div>
        </div>
    </div>
  )
}

export default DetailsCard