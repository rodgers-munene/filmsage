import React, { useEffect, useState } from 'react'
import { fetchTrailers } from '@/lib/data'

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

interface MovieSynopsisProps {
    data: Movie
}

const MovieSynopsis = ( { data }: MovieSynopsisProps ) => {
  const [trailerData, setTrailerData] = useState<Trailer[]>([])

  useEffect(() => {
      const getTrailers = async () => {
        const trailers = await fetchTrailers(data.id)
        
        setTrailerData(trailers)
      }
      getTrailers()
   }, [data])

  const trailerTypes = trailerData.filter((clip) => clip.type === 'Trailer')
  
  

  return (
    <div className='w-full h-auto'>

      <div className='w-full mt-4 h-40 flex items-center'>
        <div className='w-[90%] ml-7'>
            <h1 className='uppercase text-xl font-bold'>Synopsis</h1>
            <p className=' text-gray-400 mt-4'>{data.overview}</p>
        </div>
      </div>
      {/* fetch movie trailers */}
      <div className='w-full h-64 mt-6'>
        <h1 className='uppercase text-xl font-bold ml-5'>Trailers</h1>
          <div className='w-[90%] h-[90%] ml-5 mt-3 flex gap-x-10 overflow-auto custom-scrollbar'>
          {trailerTypes.map((clip, index) => (
            <iframe
            key={index}
            src={`https://www.youtube.com/embed/${clip.key}`}
            width={310}
            height={220}
            style={{ border: 'none' }}
            allowFullScreen
            title='Trailer'
            className='rounded-lg'
            >

            </iframe>
          ))}
          </div>
      </div>

    </div>
  )
}

export default MovieSynopsis