import React from 'react'
import Link from 'next/link'
import { HeartIcon, PlayIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import TrendingMovies from './trendingMovies'



type MovieData = {
    poster_path: string,
    title: string,
    id: number,
    genre: string,
    release_date: string
    first_air_date: string
    vote_average: number,
    overview: string,
    name:string
}

type MovieDivProps = {
    movies: MovieData[],
    title: string 
    show_type: 'movie' | 'tv'
}

const getYear = (fullDate: string) => {
    const date = new Date(fullDate)

    return date.getFullYear()
}


const MovieDiv = ( { movies, title, show_type }: MovieDivProps ) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

  return (
    <div className='w-screen'>
        <h2 className='text-2xl font-semibold mb-4 ml-4'>{title}</h2>
        <div className='w-full flex justify-center flex-col lg:flex-row items-start'>
            
            <div className='w-full lg:w-3/4 flex'>
                <div className='flex flex-wrap justify-around gap-y-16 xl:gap-x-4'>
                {movies ? (movies.map( (movie) => (
                    <Link href={`${show_type === 'movie' ? `/movies/${movie.id}`: `/tv-shows/${movie.id}` }`}
                        key={movie.id}
                        className='relative inline-block group max-xs:w-[140px] sm:w-[170px] 
                        h-[240px] md:h-[300px]  xl:h-[300px] xl:w-[180px]
                        rounded-lg hover:scale-105 transition-transform duration-300
                        '>
                        <Image
                        src={movie.poster_path? `${IMAGE_BASE_URL}${movie.poster_path}`: "/default_image.png"}
                        alt={movie.title}
                        fill
                        style={{objectFit: 'fill'}}
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className=''
                        priority
                        >

                        </Image>
                    <div className='absolute w-full -bottom-12'>
                        <h1 className='text-lg font-semibold truncate'>{movie.title? movie.title : movie.name}</h1>
                        <div className='w-full flex justify-between'>
                            <p className='text-gray-500 text-sm'>
                                {getYear(movie.release_date? movie.release_date : movie.first_air_date)}
                            </p>

                            <div className='flex items-center w-1/2 justify-between text-sm'>
                                <HeartIcon className='w-4 h-4'/>
                                <div className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gold" className="size-4 mr-2">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                                <p className='text-yellow-400'>{movie.vote_average.toFixed(1)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                        {/* hovered div */}
                        <div className='absolute top-0 left-0 w-full h-full bg-opacity-0 group-hover:bg-opacity-90 transition-opacity duration-300 bg-black z-10 flex flex-col justify-around'>
                            <h1 className='text-white pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>{movie.title}</h1>
                            <div className='w-full h-[27%] sm:h-[32%] overflow-hidden text-ellipsis line-clamp-[4] sm:line-clamp-6 max-xs:hidden'>
                                <p className='text-gray-300 pl-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full'>{movie.overview}</p>
                            </div>
                            <div className='flex w-full items-center justify-center opacity-0 group-hover:opacity-100'>
                                <button className='bg-red-600 h-10 px-1 rounded-lg flex items-center'><PlayIcon className='h-5 w-5 mr-2' />Watch Trailer</button>
                            </div>
                        </div>
                    </Link>
                ))): "error"}
                </div>
            </div>
            <div className='w-full lg:w-1/4 min-h-10 h-auto max-h bg-gray-900 rounded-md mt-20 lg:mt-0'>
                <TrendingMovies type={show_type}/>
           </div>
        </div>
    </div>
  )
}

export default MovieDiv