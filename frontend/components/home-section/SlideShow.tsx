import React, { useEffect, useState } from 'react'
import { HeartIcon, CalendarIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid'
import { Genres } from '@/lib/data'
import { useTrailer } from '@/context/TrailerDivContext'
// import getConfig from 'next/config'

interface Slide {
  id: number,
  poster_path: string,
  backdrop_path: string,
  title: string,
  genre_ids: number,
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
  const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

  const { toggleVisibility } = useTrailer();

  // Automatic SLideshow
  useEffect(() =>{
    const slideInterval = setInterval(() =>{
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, interval)

    
    return () => clearInterval(slideInterval)
    
  }, [interval, slides.length]);

  // button manual navigation
  
  // navigate left
  const navLeft = () => {
    setCurrentIndex(currentIndex - 1);
  }
  // navigate right
  const navRight = () => {
    setCurrentIndex(currentIndex + 1)
  }

  // get release Date

  const getYear = ( fullDate: string ) => {
      const date = new Date(fullDate)

      return date.getFullYear()
  }
  
  return (
    <div className={`relative w-screen h-[37rem] mt-14 mx-auto flex flex-col justify-between min-w-screen bg-slate-900`}>
      <div>
      <h2 className='text-center text-2xl font-semibold'>Your Weekend buddy for this Week</h2> 
      </div>

      <div className='w-screen h-[28rem] mx-auto flex items-center justify-center min-w-screen overflow-hidden'>
        {/* slideshow */}
        
        {/* button to manage the slideshow */}

        {/* left button */}
        {currentIndex > 0 && (
          <div
           onClick={navLeft}
           className='absolute z-[999] left-7 w-12 h-12
           bg-black bg-opacity-70 flex justify-center
            items-center rounded-full cursor-pointer
            hover:scale-110 transition-all duration-75 ease-in-out
            border border-white'>
            < ArrowLeftIcon className='w-10'/>
          </div>
        )}

        {/* // right button */}
        {currentIndex < 9 && (
          <div 
           onClick={navRight}
           className='absolute z-50 right-7 w-12 h-12
           bg-black bg-opacity-70 flex justify-center
            items-center rounded-full cursor-pointer
            hover:scale-110 transition-all duration-75 ease-in-out
            border border-white'>
            < ArrowRightIcon className='w-10'/>
          </div>
        )}
       

        {slides.map((slide, index) => (
          <div
          key={index}
          className={`relative transition-all flex flex-col justify-around items-center duration-700 ease-in-out ${index === currentIndex? "w-2/3 h-[90%]": ""} ${index - currentIndex >= 1 || currentIndex - index >= 1? "hidden" : ""}`}
          >
              <img
              src={` ${slide.backdrop_path? `${BACKDROP_BASE_URL}${slide.backdrop_path}`: "/default_image"}`}
              alt={slide.title}
              
              className={`w-full h-full object-cover absolute
                ${index === currentIndex? "rounded-lg": ""} 
                ${index === currentIndex - 1? "rounded-r-lg": ""} 
                ${index === currentIndex + 1? "rounded-l-lg" : ""}`}
              >
                 
              </img>

             

                {/* show movie title */}
              <h4 className={` z-10
                ${index === currentIndex? "text-3xl font-bold": ""} 
                ${index === currentIndex - 1? "text-lg": ""} 
                ${index === currentIndex + 1? "text-lg" : ""}
                `}>{slide.title}</h4>

                 {/* play trailer button */}

              {index === currentIndex && (
                  <div className='z-10'>
                    <button  className='p-2 bg-blue-400 bg-opacity-75'>
                      More details
                      
                    </button>
                  </div>
                )}
          </div>
        ))}

      

      </div>

     </div>
  )
}

export default Slideshow
