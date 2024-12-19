'use client'

import React, { useEffect, useState } from 'react'
import { useSidebar } from '@/context/SidebarContext'
import { fetchMoviesByGenre } from '@/lib/data'
import { useGenreContext } from '@/context/GenreMoviesContext'
import FilterDiv from '@/components/movie-page/filterDiv'
import MovieDiv from '@/components/movie-page/movieDiv'


const TvShows = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar()
  const { selectedGenres, resetGenres } = useGenreContext()
  const [ shows, setShows ] = useState([])

  // functions
  const handleMainClick = () =>{
    if(isSidebarOpen){
      toggleSidebar();
    }
  } 
  useEffect(() => {
    resetGenres()
  }, [])

  // fetch tv shows
  useEffect(() =>{
    const fetchShows = async () =>{
      const data = await fetchMoviesByGenre(selectedGenres, 'tv')
      setShows(data)
    }

    fetchShows()
  }, [selectedGenres])
  

    return (
      <div
       onClick={handleMainClick}
       className='w-screen h-screen'>

        <FilterDiv show_type='tv'/>

        <MovieDiv movies={shows} title='Tv Shows' show_type='tv'/>

      </div>
    )
}

export default TvShows