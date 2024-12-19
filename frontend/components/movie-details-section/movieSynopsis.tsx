import React, { useEffect, useState } from 'react'
import { fetchCast, fetchTrailers } from '@/lib/data'
import Link from 'next/link'

interface Movie {
    id: number
    title: string
    overview: string
}


interface Trailer{
  key: string
  type: string
  name: string
}

interface Cast {
  id: number;
  name: string;
  character: string;
}

interface MovieSynopsisProps {
    data: Movie
    show_type: 'movie' | 'tv'
}

const MovieSynopsis = ( { data, show_type }: MovieSynopsisProps ) => {
  const [trailerData, setTrailerData] = useState<Trailer[]>([])
  const [movieCast, setMovieCast] = useState<Cast[]>([])

  useEffect(() => {
      const getTrailers = async () => {
        const trailers = await fetchTrailers(data.id, show_type)
        
        setTrailerData(trailers)
      }
      const getCast = async () => {
        const castData = await fetchCast(data.id, show_type)

        setMovieCast(castData)
      }
      getCast()
      getTrailers()
   }, [data])

  const trailerTypes = trailerData.filter((clip) => (clip.type === 'Trailer' || clip.type === "Teaser" ) )
  
  

  return (
    <div className='w-full h-auto'>

      <div className='w-full mt-4 min-h-40 h-auto flex items-center'>
        <div className='max-xs:w-full w-[90%]'>
            <h1 className='uppercase lg:text-xl font-bold'>Synopsis</h1>
            <p className=' text-gray-400 mt-4 text-sm'>{data.overview}</p>
        </div>
      </div>
      {/* fetch movie trailers */}
      <div className='w-full h-64 mt-6'>
        <h1 className='uppercase lg:text-xl font-bold'>Trailers & Teasers</h1>
          <div className='max-xs:w-full w-[90%] lg:h-[90%] mt-3 flex gap-x-10 overflow-auto custom-scrollbar'>
          {trailerTypes.map((clip, index) => (
            <iframe
            key={index}
            src={`https://www.youtube.com/embed/${clip.key}`}
            width={270}
            height={180}
            style={{ border: 'none' }}
            allowFullScreen
            title='Trailer'
            className='rounded-lg'
            >

            </iframe>
          ))}
          </div>
      </div>

      <div className='w-full h-auto lg:mt-10'>
        <h1 className='uppercase text-xl font-bold'>Cast</h1>
        <div className='max-xs:w-full w-[90%] h-auto mt-3 flex gap-x-5 overflow-auto no-scrollbar'>
          {movieCast?.map((cast) => (
            <div
             key={cast.id}
             className='min-w-40 flex flex-col h-14 items-center p-1 rounded-lg justify-center bg-gray-900 mb-4'>
              <Link href='' className='text-sm '>{cast.name}</Link>
              <p className='text-gray-500 text-xs'>{cast.character}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default MovieSynopsis