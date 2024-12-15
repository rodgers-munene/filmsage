import React, { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useTrailer } from '@/context/TrailerDivContext'
import { fetchTrailers } from '@/lib/data'

interface Movie{
  id: number
  title: string
}

interface TrailerDivProps{
  data: Movie;
}
interface Trailer{
  key: string;
  name: string;
  type: string;
  official: boolean;
}

const TrailerDiv = ( {data}: TrailerDivProps ) => {
  const {visibility, toggleVisibility } = useTrailer()
  const [allTrailers, setAllTrailers] = useState<Trailer[]>()
 
  useEffect(() => {
    const getData = async () => {
      const trailerData = await fetchTrailers(data.id, 'movie')

      setAllTrailers(trailerData)
    }
    getData()
  }, [data])

  const firstTrailerkey = allTrailers?.find( (trailer) => (
    trailer.type === "Trailer" && trailer.official === true 
  ))?.key
 
  return (
   <div>
     {visibility && (
      <div className={`absolute w-3/4 h-[85%] bg-gray-950 top-20 left-[12.5%] z-50 rounded-lg flex flex-col justify-between`}>
        <div className='w-full h-10 flex items-center justify-between'>
          <h1 className='text-2xl text-gray-200 ml-3'>{data.title}</h1>
          <button
          onClick={toggleVisibility}
          className='mr-3'>
              <XMarkIcon className='h-10 w-10' />
          </button>
          
        </div>
      
        <div>
          <iframe
            src={`https://www.youtube.com/embed/${firstTrailerkey}?autoplay=1`}
            style={{ border: 'none', width: '100%', height: '540px'}}
            allow='autoplay'
            allowFullScreen
            title='Trailer'
            className=''
            ></iframe>
        </div>
        
     
    </div>
     )}

   </div>
  )
}

export default TrailerDiv