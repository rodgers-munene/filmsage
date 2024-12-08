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
  console.log(trailerTypes)
  console.log(trailerData);
  

  return (
    <div className='w-full h-auto'>

      <div className='w-full mt-4 h-40 flex items-center'>
        <div className='w-[90%] ml-7'>
            <h1 className='uppercase text-xl font-bold'>Synopsis</h1>
            <p className=' text-gray-400 mt-4'>{data.overview}</p>
        </div>
      </div>
      {/* fetch movie trailers */}
      <div className='w-full mt-6'>
          {trailerTypes.map((clip) => (
            <iframe
            src={`https://www.youtube.com/embed/${clip.key}`}
            width={200}
            height={150}
            style={{ border: 'none' }}
            allowFullScreen
            title='Trailer'
            className='mt-4 ml-6'
            >

            </iframe>
          ))}
      </div>

    </div>
  )
}

export default MovieSynopsis