import React from 'react'
import Link from 'next/link'


type MovieData = {
    poster_path: string,
    title: string,
    id: number,
    genre: string
}

type MovieDivProps = {
    movies: MovieData[],
    title: string 
}

const MovieDiv = ( { movies, title }: MovieDivProps ) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

  return (
    <div className='w-screen'>
        <h2 className='text-2xl font-semibold mb-4 ml-5'>{title}</h2>
        <div className='whitespace-nowrap py-2'>
            <div className='flex flex-wrap justify-around '>
            {movies ? (movies.map( (movie, index) => (
                <Link href={`/movies/${movie.id}`}
                    key={movie.id}
                    className='inline-block w-[230px] max-w-sm rounded-lg'>
                    <img 
                    src={movie.poster_path? `${IMAGE_BASE_URL}${movie.poster_path}`: "/default_image.png"}
                    alt={movie.title}
                    className='w-full h-auto object-fill rounded-xl' />
                    <h1 className='text-lg font-semibold truncate'>{movie.title}</h1>
                </Link>
            ))): "error"}
            </div>
        </div>
    </div>
  )
}

export default MovieDiv