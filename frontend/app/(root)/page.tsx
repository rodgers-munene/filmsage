'use client'
import React, { useEffect, useState } from 'react'
// import Header from '@/components/header'
import { useSidebar } from '@/context/SidebarContext'
import { fetchMoviesByGenre } from '@/lib/data'
import Slideshow from '@/components/home-section/SlideShow'
import MovieDiv from '@/components/movie-page/movieDiv'
import FilterDiv from '@/components/movie-page/filterDiv'
import { useGenreContext } from '@/context/GenreMoviesContext'

const Home = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { selectedGenres } = useGenreContext()
  const [movies, setMovies] = useState([])
  
  
const handleMainClick = () => {
  if(isSidebarOpen){
    toggleSidebar();
  }
}
useEffect(()=>{
  const fetchMovies = async () =>{
    const data = await fetchMoviesByGenre(selectedGenres, 'movie')
    setMovies(data)
  
  }
  
  fetchMovies()
}, [selectedGenres])


  return (
    <div className="flex flex-col">
      {/* header */}

      <div onClick={handleMainClick} className='w-screen h-screen'>
     
      {/* filters */}
      <FilterDiv />

      <MovieDiv movies={movies} title='Movies' />

      </div>

    </div>
  )
}

export default Home