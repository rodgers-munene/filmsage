import React, { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Genres } from '@/lib/data'
import { useTrailer } from '@/context/TrailerDivContext'
// import getConfig from 'next/config'

interface Genre {
  id: number,
  name: string
}
interface Slide {
  id: number,
  poster_path: string,
  backdrop_path: string,
  title: string,
  genre_ids: number[],
  release_date: string,
  media_type: string,
  genres: Genre[],
  vote_average: number
  overview: string
}
interface SlideshowProps{
    slides: Slide[],
    interval: number,
}

const  getGenreName = (genreId: number[]) => {
  let genreArray
  for (let i = 0; i < genreId.length; i++) {
    genreArray = Genres[genreId[i]] || "unknown Genre"
    
  }
 
  return genreArray
}
 

const Slideshow = ( {slides, interval}: SlideshowProps ) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
  const [movieTrailers, setMovieTrailers] = useState("")

  const { toggleVisibility } = useTrailer();

  // Automatic SLideshow
  useEffect(() =>{
    const slideInterval = setInterval(() =>{
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, interval)

    
    return () => clearInterval(slideInterval)
    
  }, [interval, slides.length]);



  

//  format vote average

  const formatVoteAverage = (num: number) =>{
    return num.toFixed(1)
  }
  

  // get release Date

  const getYear = ( fullDate: string ) => {
      const date = new Date(fullDate)

      return date.getFullYear()
  }
  
  return (
    <div className={`relative w-screen h-[37rem] mx-auto flex flex-col justify-between min-w-screen bg-slate-900`}>
      

      <div className='w-screen h-full mx-auto flex items-center justify-center min-w-screen overflow-hidden'>
        {/* slideshow */}      

        {slides.map((slide, index) => (
          <div
          key={index}
          className={`relative w-full h-full transition-all flex flex-col justify-around items-center duration-700 ease-in-out ${index === currentIndex? "": "hidden"}`}
          >
              <img
              src={` ${slide.backdrop_path? `${BACKDROP_BASE_URL}${slide.backdrop_path}`: "/default_image"}`}
              alt={slide.title}
              
              className={`w-full h-full object-cover absolute`}
              >
                 
              </img>              

                {/* shadow and movie details */}
                <div className='w-full h-full z-50 bg-black bg-opacity-80 flex flex-col justify-center items-center'>

                  {/* movie details */}
                  <div className='flex w-2/3 h-2/3'>
                    <img 
                    src={`${slide.poster_path? `${IMAGE_BASE_URL}${slide.poster_path}`: "/default_image"}`} 
                    alt={slide.title}

                    className="h-full w-1/3"
                     />
                    <div className='ml-5 w-2/3 h-full flex flex-col justify-around'>
                      {/* title */}
                      <h1 className='text-2xl'>{slide.title}</h1>
                      {/* title */}
                      <p>{getYear(slide.release_date)}</p>
                      {/* genres */}

                      <div>
                        <p>{getGenreName(slide.genre_ids)}</p>
                      </div>
                      {/* rating */}
                      <div className='flex w-1/3 justify-around'>
                        <StarIcon className=' w-5 h-5 text-yellow-400'/>
                        <p>{formatVoteAverage(slide.vote_average)}
                          <span className='text-gray-600 text-xs'>/10</span>
                        </p>
                        <div className="w-12 h-6 flex bg-yellow-500 items-center justify-center rounded-md ">
                          <span className="text-black font-bold text-xs">IMDb</span>
                        </div>
                      </div>
                      {/* overview */}
                      <div className='h-[6.5rem] overflow-hidden'>
                        <p className='text-sm text-gray-400 line-clamp-5'>{slide.overview}</p>
                      </div>
                      {/* buttons */}
                      <div className=''>
                        <button className='p-3 bg-red-500 rounded-xl'>
                          More Details
                        </button>
                        
                      </div>
                    </div>

                  </div>

                 

                </div>
          </div>
        ))}

      

      </div>

     </div>
  )
}

export default Slideshow
