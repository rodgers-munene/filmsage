import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

interface Movie {
    id: number
    title: string
    poster_path: string

}

interface DramaProps {
    data: Movie[]
}

const Drama = ( { data }: DramaProps ) => {
    const [currentIndex, setCurrentIndex] = useState(1)
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

    // currentIndex increment
    useEffect(() => {
        const interval = 5000;
        // start interval
        const divInterval = setInterval(() => {
            if(currentIndex < 3){
                setCurrentIndex((prevIndex) => prevIndex +  1)
            }else{
                setCurrentIndex(1)
            }
        }, interval)

        // clear interval
        return () => clearInterval(divInterval);
    })

  return (
    <div className='flex h-[26rem] justify-center'>
        <div className='h-full w-[95%] bg-white flex'>
            {/* left side- contains container title and the paragraph explaining the title */}
            <div className=' w-1/3 h-full flex flex-col justify-around items-center'>
                <div>
                    <h1 className='text-3xl font-bold text-black'>DRAMA & ROMANCE</h1>
                    <p className='text-gray-800 mt-7'> Enacting, emotional and unexpected </p>
                </div>

                <div>
                    <button className='text-black p-2 font-bold border-b-2 border-blue-500 hover:border-blue-800 hover:scale-105 transition-all duration-100 flex items-center'>
                        BROWSE MORE ROMANCE
                        <ArrowRightIcon className='h-6 w-6'/>
                    </button>
                </div>
            </div>

            {/* right side- contains 3 divs each containing 4 movies of the drama and romance genre */}
            <div className='relative w-2/3 flex flex-col justify-center items-center  overflow-auto'>
                {currentIndex === 1 && (
                    <div className='flex '>
                    {data.slice(1, 5).map((movie, index) => (
                        <div className='mx-4 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'>
                            <img
                                src={movie.poster_path? `${IMAGE_BASE_URL}${movie.poster_path}`: "/default_image"}
                                alt={movie.title}
                                className='h-60' />
                                <p className='text-black text-lg font-medium text-center truncate w-40'>{movie.title}</p> 
                            </div>
                    ))}
                </div>
                )}
                {currentIndex === 2 && (
                    <div className='flex'>
                    {data.slice(5, 9).map((movie, index) => (
                            <div className='mx-4 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'>
                                <img
                                    src={movie.poster_path? `${IMAGE_BASE_URL}${movie.poster_path}`: "/default_image"}
                                    alt={movie.title}
                                    className='h-60' />
                                <p className='text-black text-lg font-medium text-center truncate w-40'>{movie.title}</p> 
                            </div>
                        ))}
                </div>
                )}
                {currentIndex === 3 && (
                    <div className='flex'>
                    {data.slice(9, 13).map((movie, index) => (
                            <div className='mx-4 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'>
                                <img
                                    src={movie.poster_path? `${IMAGE_BASE_URL}${movie.poster_path}`: "/default_image"}
                                    alt={movie.title}
                                    className='h-60' />
                                <p className='text-black text-lg font-medium text-center truncate w-40'>{movie.title}</p> 
                            </div>
                        ))}
                </div>
                )}
                 {/* div counter */}
                <div className='absolute right-3 flex flex-col items-center'>
                    <div className='flex justify-center items-center text-black border-b border-black w-8 h-8 text-xl font-semibold'>{currentIndex}</div>
                    <div className={`w-2 h-7 mt-1 rounded-lg ${currentIndex === 1? "bg-black" : "bg-gray-500"}`}></div>
                    <div className={`w-2 h-7 mt-1 rounded-lg ${currentIndex === 2? "bg-black" : "bg-gray-500"}`}></div>
                    <div className={`w-2 h-7 mt-1 rounded-lg ${currentIndex === 3? "bg-black" : "bg-gray-500"}`}></div>
                
                 </div>
            </div>

           
            
        </div>
    </div>
  )
}

export default Drama