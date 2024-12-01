'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/components/header'
import { useSidebar } from '@/context/SidebarContext'
import { fetchMoviesByGenre } from '@/lib/data'
import Slideshow from '@/components/SlideShow'
import MovieDiv from '@/components/movieDiv'
import FilterDiv from '@/components/filterDiv'
import { useGenreContext } from '@/context/GenreMoviesContext'

const Home = () => {
  const loggedIn = { firstName: "Rodgers"}
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { selectedGenres } = useGenreContext()
  const [movies, setMovies] = useState([])
  
  const [loading, setLoading] = useState(true)


const handleMainClick = () => {
  if(isSidebarOpen){
    toggleSidebar();
  }
}
useEffect(()=>{
  const fetchMovies = async () =>{
    const data = await fetchMoviesByGenre(selectedGenres)
    setMovies(data)
  
  }
  
  fetchMovies()
  console.log(selectedGenres)
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