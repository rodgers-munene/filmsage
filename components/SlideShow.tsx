import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HeartIcon, CalendarIcon } from '@heroicons/react/20/solid'
import { Genres } from '@/lib/data'
// import getConfig from 'next/config'

interface Slide {
  poster_path: string,
  title: string,
  genre_ids: number[],
  release_date: string,
  media_type: string,
}
interface SlideshowProps{
    slides: Slide[],
    interval: number,
}

function getGenreName(genreId: number): string{
  return Genres[genreId as keyof typeof Genres] || "unknown Genre";
}

const Slideshow = ( {slides, interval}: SlideshowProps ) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  // Automatic SLideshow
  useEffect(() =>{
    const slideInterval = setInterval(() =>{
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, interval)

    return () => clearInterval(slideInterval)
  }, [interval, slides.length])


  // get release Date

  const getYear = ( fullDate: string ) => {
      const date = new Date(fullDate)

      return date.getFullYear()
  }
  
  return (
    <div className='relative w-screen h-[28rem] mt-14 mx-auto flex min-w-screen'>
      
     {slides.map((slide, index) => (
      <div
      key={index}
      className={`absolute inset-0 flex justify-center transition-transform duration-500 ${index === currentIndex? "opacity-100" : "opacity-0"}`}
      >
        <div className='relative w-[90%] h-full mt-4 flex flex-col'>

          {/* Trending this week */}
          
          {/* Title, watch button and favorite button */}
          <div className='w-full h-full z-20  flex items-end justify-center'>
              <div className='relative flex flex-col gap-6 w-1/2 h-1/2'>
                <div className='ml-2 '>
                    <h2 className='text-white/90 font-bold uppercase text-3xl'>{slide.title}</h2>
                </div>

                <div className='flex w-1/2 justify-between'>
                  <h2 className='ml-2 text-white font-semibold '>{getGenreName(slide.genre_ids[0])}</h2>
                  <h2 className='text-white font-semibold flex flex-center'> <CalendarIcon className='h-4 w-4 mr-2 text-red-800'/>
                  {getYear(slide.release_date)}
                  </h2>
                  <h2 className='text-white font-semibold uppercase'>{slide.media_type}</h2>
                </div>

               <div className='flex'>
                <button
                className='mr-4 w-32 h-10 bg-red-900 text-white font-semibold text-xl rounded-2xl hover:scale-105' 
                >Watch</button>

                <button className='ml-4 w-10 h-10 bg-gray-950 text-white flex justify-center items-center rounded-lg hover:scale-105'>
                  <HeartIcon className='h-6 w-6' />
                </button>
               </div>

              </div>
          </div>

          {/* shade */}
          <div className=' absolute w-full h-full pointer-events-none z-10 bg-black opacity-60'>   
          </div>

          {/* image */}
          <Image
            src={slide.poster_path ? `${IMAGE_BASE_URL}${slide.poster_path}` : '/default_image.png'}
            alt={slide.title}
            className='object-fill transition-transform duration-500 ease-in-out transform overflow-hidden'
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            />
            
        </div>

      </div>
     ))}

    
     

     

    

     
    </div>
  )
}

export default Slideshow
