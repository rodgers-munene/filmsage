import React, { useEffect, useState } from 'react'
import { fetchRecommendation, fetchSimilar, } from '@/lib/data';
import { HeartIcon, PlayIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import Image from 'next/image'

interface Genre {
    id: number
    name: string
  }

interface Movie{
    id: number;
    title: string;
    poster_path: string,
    // genre: string,
    release_date: string
    vote_average: number,
    overview: string,
    genres: Genre[]
}

interface ExtraMoviesProps {
    data: Movie;
    title: string
    propInput: number | number[];
}




const ExtraMovies = ( { data, title, propInput }: ExtraMoviesProps ) => {
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
    const [ExtraMovies, setExtraMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    

    useEffect(() => {
        setLoading(true)
        
        if( typeof propInput === "number"){
            const getExtra = async () => {
                let fetchedData = await fetchSimilar(propInput, 'movie')
                setExtraMovies(fetchedData)
            }
            getExtra()
        }else if(Array.isArray(propInput)){
            const getExtra = async () => {
                let fetchedData = await fetchRecommendation(propInput, 'movie')
                setExtraMovies(fetchedData)
            }
            getExtra()
        }

        setLoading(false)
    }, [data])

    const getYear = (fullDate: string) => {
        const date = new Date(fullDate)
    
        return date.getFullYear()
    }
    


  return (
    <div className='w-screen h-96 flex flex-col mt-4 justify-between'>
        <h1 className='ml-4 text-2xl font-bold text-gray-400 uppercase'>{title}</h1>

        <div className='py-2 '>
            <div className='flex overflow-x-auto overflow-y-hidden h-[22rem] gap-x-4 ml-3 mr-7 no-scrollbar '>
            {ExtraMovies.length > 0 ? (ExtraMovies.map( (movie) => (
                <Link href={`/movies/${movie.id}`}
                    key={movie.id}
                    className='relative group min-w-[180px] h-[270px] max-w-sm rounded-lg hover:scale-105 transition-transform duration-500 first:ml-1'>
                    <Image
                     src={movie.poster_path? `${IMAGE_BASE_URL}${movie.poster_path}`: "/default_image.png"}
                     alt={movie.title}
                     fill
                     style={{objectFit: 'fill'}}
                     sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     className='rounded-xl'
                    >

                    </Image>
                   <div className='absolute w-full -bottom-12'>
                   <h1 className='text-lg font-semibold truncate'>{movie.title}</h1>
                    <div className='w-full flex justify-between'>
                        <p className='text-gray-500 text-sm'>
                            {getYear(movie.release_date)}
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
                    <div className='absolute top-0 left-0 w-full h-full bg-opacity-0 group-hover:bg-opacity-90 transition-opacity duration-500 bg-black z-10 flex flex-col justify-around rounded-lg'>
                        <h1 className='text-white pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>{movie.title}</h1>
                        <div className='w-full h-[18%] overflow-hidden text-ellipsis line-clamp-[3]'>
                            <p className='text-gray-500 pl-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-full'>{movie.overview}</p>
                        </div>
                        <div className='flex w-full items-center justify-center opacity-0 group-hover:opacity-100'>
                            <button className='bg-red-600 p-2 rounded-lg flex items-center'><PlayIcon className='h-5 w-5 mr-2' />Watch Trailer</button>
                        </div>
                    </div>
                </Link>
            ))): (
                <p className='text-gray-600'>Not Available!</p>
            )}
            </div>
        </div>
    </div>
  )
}

export default ExtraMovies