'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/components/header'
import { useSidebar } from '@/context/SidebarContext'
import Image from 'next/image'
import { fetchTrending, fetchAction, fetchComedy, fetchDrama, fetchRomance, fetchSciFi, fetchThriller} from '@/lib/data'
import Slideshow from '@/components/SlideShow'
import MovieDiv from '@/components/movieDiv'

const Home = () => {
  const loggedIn = { firstName: "Rodgers"}
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [trending, setTrending] = useState([])
  const [action, setAction] = useState([])
  const [comedy, setComedy] = useState([])
  const [drama, setDrama] = useState([])
  const [sciFi, setSciFi] = useState([])
  const [thriller, setThriller] = useState([])
  const [romance, setRomance] = useState([])
  
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
      const comedyMovies = await fetchComedy()
      const dramaMovies = await fetchDrama()
      const sciFiMovies = await fetchSciFi()
      const romanceMovies = await fetchRomance()
      const thrillerMovies = await fetchThriller()

      setTrending(trendingMovies.results)
      setAction(actionMovies.results)
      setComedy(comedyMovies.results)
      setDrama(dramaMovies.results)
      setThriller(thrillerMovies.results)
      setSciFi(sciFiMovies.results)
      setRomance(romanceMovies.results)

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
      {/* header */}

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
        <MovieDiv movies={action} title='Action'/>
      </div>

      {/* comedy movies */}
      <div className=''>
          <MovieDiv movies={comedy} title='Comedy'/>
      </div>

      {/* drama movies */}
      <div className=''>
          <MovieDiv movies={drama} title='Drama'/>
      </div>

      {/* Thriller */}
      <div className=''>
          <MovieDiv movies={thriller} title='Thriller'/>
      </div>

      {/* Scifi */}
      <div className=''>
          <MovieDiv movies={sciFi} title='SciFi'/>
      </div>

      {/* Romance */}
      <div className=''>
          <MovieDiv movies={romance} title='Romance'/>
      </div>

    </div>
  )
}

export default Home