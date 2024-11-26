'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/components/header'
import { useSidebar } from '@/context/SidebarContext'
import { fetchTrending, fetchAction, fetchComedy, fetchDrama, fetchRomance, fetchSciFi, fetchThriller} from '@/lib/data'
import Slideshow from '@/components/SlideShow'
// import MovieDiv from '@/components/movieDiv'
import FilterDiv from '@/components/filterDiv'

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

useEffect(() =>{
  const getData = async () =>{
    try {
      const trendingMovies = await fetchTrending()
      const actionMovies = await fetchAction()
      const comedyMovies = await fetchComedy()
      const dramaMovies = await fetchDrama()
      const sciFiMovies = await fetchSciFi()
      const romanceMovies = await fetchRomance()
      const thrillerMovies = await fetchThriller()

      setTrending(trendingMovies)
      setAction(actionMovies)
      setComedy(comedyMovies)
      setDrama(dramaMovies)
      setThriller(thrillerMovies)
      setSciFi(sciFiMovies)
      setRomance(romanceMovies)


    } catch (error) {
        console.log(error)
    }finally{
      setLoading(false)
    }
  } 

  getData()
}, [])

const handleMainClick = () => {
  if(isSidebarOpen){
    toggleSidebar();
  }
}



  return (
    <div className="flex flex-col">
      {/* header */}

      <div onClick={handleMainClick} className='w-screen h-screen'>
     
      {/* filters */}
      <FilterDiv />

      </div>

    </div>
  )
}

export default Home