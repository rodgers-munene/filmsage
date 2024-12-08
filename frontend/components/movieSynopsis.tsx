import React from 'react'

interface Movie {
    id: number
    title: string
    overview: string
}

interface MovieSynopsisProps {
    data: Movie
}

const MovieSynopsis = ( { data }: MovieSynopsisProps ) => {
  return (
    <div className='w-full mt-4 h-40 flex items-center'>
        <div className='w-[90%] ml-7'>
            <h1 className='uppercase text-xl font-bold'>Synopsis</h1>
            <p className=' text-gray-400 mt-4'>{data.overview}</p>
        </div>
    </div>
  )
}

export default MovieSynopsis