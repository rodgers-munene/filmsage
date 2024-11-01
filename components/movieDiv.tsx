import React from 'react'

type MovieData = {
    poster_path: string,
    title: string,
    id: number,
}

type MovieDivProps = {
    movies: MovieData[],
    title: string 
}

const MovieDiv = ( { movies, title }: MovieDivProps ) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

  return (
    <div className='my-8 ml-14'>
        <h2 className='text-2xl font-semibold mb-4'>{title}</h2>
        <div className='overflow-x-scroll whitespace-nowrap py-2 hide-scrollbar'>
            <div className='flex space-x-4'>
            {movies.map( (movie, index) => (
                <div
                 key={movie.id}
                 className='inline-block min-w-[200px] max-w-sm rounded-lg overflow-hidden'>
                    <img 
                    src={movie.poster_path? `${IMAGE_BASE_URL}${movie.poster_path}` : "/default_image.png"}
                    alt={movie.title}
                    className='w-full h-auto' />
                    <h1 className='text-lg font-semibold truncate'>{movie.title}</h1>
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default MovieDiv