import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface Slide {
  poster_path: string,
  title: string
}
interface SlideshowProps{
    slides: Slide[],
    interval: number
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

  // manual navigation

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0? slides.length - 1: prevIndex - 1 ))
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1) % slides.length)
  }
  
  return (
    <div className='relative w-screen h-[34rem] mx-auto flex mt-14 min-w-screen'>
      
     {slides.map((slide, index) => (
      <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex? "opacity-100 " : "opacity-0"}`}
      >
       <div className='relative w-[60%] h-full flex ml-14 flex-col'>
       <h1 className='text-2xl font-semibold mb-4'>Trending this week</h1>
        <img 
          src={slide.poster_path ? `${IMAGE_BASE_URL}${slide.poster_path}` : '/default_image.png'}
          alt={slide.title}
          className=' w-full rounded-xl transition-transform duration-500 ease-in-out transform overflow-hidden'
          />

           {/* Navigation Button */}

          <button
            onClick={prevSlide}
            className='absolute w-11 top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-gray-100 p-2 rounded-full hover:bg-gray-800 transition text-xl duration-200'
            >
              &larr;
          </button>

          <button
            onClick={nextSlide}
            className='absolute w-11 top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-gray-100 p-2 rounded-full hover:bg-gray-800 text-xl transition duration-200'
            >
              &rarr;
          </button>

           {/*Navigation indicators*/}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
          </div>
       </div>


      </div>
     ))}

    
     

     

    

     
    </div>
  )
}

export default Slideshow
