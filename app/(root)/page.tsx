'use client'
import React, { useState } from 'react'
import Header from '@/components/header'
import { useSidebar } from '@/context/SidebarContext'
import Image from 'next/image'


const Home = () => {
  const loggedIn = { firstName: "Rodgers"}
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [movies, setMovies] = useState([])

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const url = "https://api.themoviedb.org/3/discover/movie?api_key=ae068f4ef971b7e5066b4e6790067735"
// fetching the data
async function fetchMovies() {
  try {
    let response = await fetch(`${url}`)

    let data = await response.json();
    setMovies(data.results)

  } catch (error) {
    console.log("Error fetching data:", error); //error handling
    
  }
}
const handleMainClick = () => {
  if(isSidebarOpen){
    toggleSidebar();
  }
}

fetchMovies()

  return (
    <div className={``}>
      <div>
        < Header 
        firstName={loggedIn?.firstName || "User"}/>
      </div>
      <div className={`container mx-auto p-4 mt-14 bg-gray-900 min-w-full ${isSidebarOpen? 'blur-sm': ''}`} onClick={handleMainClick}>
          <h1 className="text-3xl font-bold text-white mb-4">Movies</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
        {movies ? (movies.map((movie: any) => (
          <div key={movie.id} className="movie-card">
            <Image
              src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/default_image.jpg'}
              alt={movie.title}
              width={200}
              height={350}
              className="rounded-lg"
              priority // Optional, adds priority loading for better performance
            />
            <h3 className="text-md font-semibold mt-2 text-white">{movie.title}</h3>
          </div>
        ))) : "Loading"}
      </div>
      </div>
    
    </div>
  )
}

export default Home