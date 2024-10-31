import React from 'react'

type MovieData = {
    poster_path: string,
    title: string
}

type MovieDivProps = {
    movies: MovieData[]
}

const MovieDiv = ( { movies }: MovieDivProps ) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

  return (
    <div className='relative flex flex-nowrap overflow-x-scroll min-w-screen ml-28'>
        {movies.map( (movie, index) => (
            <div className='flex  gap-5 border border-black w-52 h-20'>
                <img 
                src={movie.poster_path? `${IMAGE_BASE_URL}${movie.poster_path}` : "/default_image.png"}
                alt={movie.title}
                className='' />
            </div>
        ))}
    </div>
  )
}

export default MovieDiv