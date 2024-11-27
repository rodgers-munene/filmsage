import React, { useEffect, useRef, useState } from 'react'
import { fetchGenres } from '@/lib/data'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

type Genre = {
  id: number;
  name: string;
};


const FilterDiv = () => {
  const[genres, setGenres] = useState<Genre[]>([])
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] =  useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)




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
      const genresData = await fetchGenres()

      setGenres(genresData.genres )

    }
    getData()
    
  }, [])
  return (
    <div className='filterDiv h-20 flex mt-14 items-center ml-[88px] relative'>
      
      {canScrollLeft && (
        <button
        onClick={() => {
         scrollContainer('left')
        }} // Calls scrollLeft when clicked.
        className={`absolute left-[-38px] top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md hover:bg-gray-400}`}
      >
        <ChevronLeftIcon className='h-5 w-5 text-black' />
      </button>
      )}
    

      <div 
      ref={containerRef}
      className='filterDiv h-full overflow-auto flex justify-evenly items-center no-scrollbar'>        
        {genres? genres.map((genre) => (
        <div className='min-w-28 flex justify-center items-center mx-4'>
           <button className='bg-gray-300 px-0 py-1 w-full text-black rounded-lg'>{genre.name}</button>
        </div>
      )): "loading"}

      </div>

      {canScrollRight && (
        <button
        onClick={() => {
          scrollContainer('right')
        }}
        className='absolute right-[-38px] top-1/2 transform bg-gray-300 bg-opacity-80 -translate-y-1/2 p-2 rounded-full shadow-md hover:bg-gray-400'
        >
          <ChevronRightIcon className='h-5 w-5 text-black' />
  
        </button>
      )}

    </div>
  )
}

export default FilterDiv