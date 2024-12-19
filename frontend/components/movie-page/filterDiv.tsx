import React, {useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { fetchMoviesByGenre, fetchGenres } from '@/lib/data';
import { useGenreContext } from '@/context/GenreMoviesContext';

type Genre = {
  id: number;
  name: string;
};

type FilterDivProps = {
  show_type: 'movie' | 'tv' 
}



const FilterDiv = ( { show_type }: FilterDivProps ) => {
  const[genres, setGenres] = useState<Genre[]>([])
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] =  useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const { selectedGenres, toggleGenre, resetGenres} = useGenreContext()
  const [movies, setMovies] = useState([])






  // button scroll to the left and the rigth
  const scrollContainer = (direction: "right" | "left") => {
    if (containerRef.current) {
      const scrollAmount = direction === 'right'? 600: -600;
      containerRef.current.scrollBy({left: scrollAmount, behavior: "smooth"})
      
    }
  };

 
  //check if scroll is possible

  const checkScrollButtons = () =>{
    if (containerRef.current){
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current

      // update button visibility based on scroll position

      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
    }
  };

  useEffect(() => {
    checkScrollButtons(); //initial check
  })

  useEffect(() =>{
    const container = containerRef.current;


    if(container){
      container.addEventListener('scroll', checkScrollButtons);

    }
  

    return () =>{
      if(container){
        container.removeEventListener('scroll', checkScrollButtons);

      }
    }
  }, [])

  

 
  useEffect(() =>{
    const getData = async () =>{
      const genresData = await fetchGenres(show_type)

      setGenres(genresData.genres )

    }
    getData()
    
  }, [])

  useEffect(() => {
    const getMoviesByGenre = async () => {
      try {
        const moviesByGenre = await fetchMoviesByGenre(selectedGenres, show_type)

        setMovies(moviesByGenre)
      } catch (error) {
        console.error("Error fetching the movies by genre")
      }
    }

    getMoviesByGenre()
  }, [])


  


  return (
    <div className='w-screen h-auto'>
      {/* genres filter div */}
      <div className='w-full h-20 flex mt-14 items-center relative'>
      
      {canScrollLeft && (
        <button
        onClick={() => {
         scrollContainer('left')
        }} // Calls scrollLeft when clicked.
        className={"absolute p-2 bg-gray-950 "}
      >
        <ChevronLeftIcon className='h-5 w-5 text-white' />
      </button>
      )}
    

      <div 
      ref={containerRef}
      className='w-full h-full overflow-auto flex justify-evenly items-center no-scrollbar'>        
 
      {/* all button */}
        <div className='min-w-28 sm:min-w-32 flex justify-center items-center mx-4'>
          <button
          onClick={resetGenres}
          className={`py-1 w-full text-sm text-white rounded-lg ${selectedGenres.length === 0? "bg-red-700": "bg-[#373737]"}`}  >
            All
          </button>
        </div>

      {/* other genres buttons */}
        {genres? genres.map((genre) => (
        <div 
        key={genre.id}
        className='min-w-28 sm:min-w-[9rem] flex justify-center items-center mx-2 sm:mx-4'>
           <button
           onClick={() =>{
            toggleGenre(genre.id)
           }}
           className={`py-1 w-full text-sm text-white rounded-lg text-ellipsis ${selectedGenres.includes(genre.id) ? "bg-red-700" : "bg-[#373737]"}`}>{genre.name}</button>
        </div>
      )): "loading"}

      </div>

      {canScrollRight && (
        <button
        onClick={() => {
          scrollContainer('right')
        }}
        className='absolute right-0 p-2 bg-gray-950'
        >
          <ChevronRightIcon className='h-5 w-5 text-white' />
  
        </button>
      )}

    </div>    
    </div>
  )
}

export default FilterDiv