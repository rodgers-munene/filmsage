'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/components/header'
import { useSidebar } from '@/context/SidebarContext'
import Image from 'next/image'
import { fetchTrending, fetchAction } from '@/lib/data'
import Slideshow from '@/components/SlideShow'
import MovieDiv from '@/components/movieDiv'

const Home = () => {
  const loggedIn = { firstName: "Rodgers"}
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [trending, setTrending] = useState([])
  const [action, setAction] = useState([])
  const [loading, setLoading] = useState(true)

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const url = "https://api.themoviedb.org/3/discover/movie?api_key=ae068f4ef971b7e5066b4e6790067735"
// fetching the data
// async function fetchMovies() {
//   try {
//     let response = await fetch(`${url}`)

//     let data = await response.json();
//     setMovies(data.results)

//   } catch (error) {
//     console.log("Error fetching data:", error); //error handling
    
//   }
// }

useEffect(() =>{
  const getTrending = async () =>{
    try {
      const trendingMovies = await fetchTrending()
      const actionMovies = await fetchAction()

      setTrending(trendingMovies.results)
      setAction(actionMovies.results)

    } catch (error) {
        console.log(error)
    }finally{
      setLoading(false)
    }
  } 

  getTrending()
}, [])

const handleMainClick = () => {
  if(isSidebarOpen){
    toggleSidebar();
  }
}

// fetchMovies()

  return (
    <div className="flex flex-col">
      <div>
        < Header 
        firstName={loggedIn?.firstName || "User"}/>
      </div>

      {/* trending this week slideshow */}
      <div className=''>
        <Slideshow slides={trending} interval={5000}/>
      </div>

      {/* action div */}
      <div className=''>
        <MovieDiv movies={action} />
      </div>
      {/* <div className={`container mx-auto p-4 mt-14 dark:bg-gray-700 min-w-full ${isSidebarOpen? 'blur-sm': ''}`} onClick={handleMainClick}>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Movies</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
        {movies ? (movies.map((movie: any) => (
          <div key={movie.id} className="movie-card">
            <Image
              src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/default_image.png'}
              alt={movie.title}
              width={200}
              height={350}
              className="rounded-lg"
              priority // Optional, adds priority loading for better performance
            />
            <h3 className="text-md font-semibold mt-2 text-gray-800 dark:text-gray-100">{movie.title}</h3>
          </div>
        ))) : "Loading"}
      </div>
      </div> */}
    
    </div>
  )
}

export default Home