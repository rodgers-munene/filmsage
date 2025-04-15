'use client'
import React, { useState, useEffect } from 'react'
import Slideshow from '@/components/home-section/SlideShow'
import Drama from '@/components/home-section/drama'
import { fetchTrending, fetchMoviesByGenre } from '@/lib/data'


const page = () => {
  const [topTen, setTopTen] = useState([]);
  const [dramaRomance, setDramaRomance] = useState([])


  // update the state function
  useEffect(() => {
    const fetchTopTen = async () =>{
      const data = await fetchTrending('movie', 'day');
      setTopTen(data);
    }

    fetchTopTen();
  }, [fetchTrending]);

  // fetch movie by genre
  useEffect(() => {
    const fetchDrama = async () => {
      const dramaMovies = await fetchMoviesByGenre([18, 10749], 'movie');
      setDramaRomance(dramaMovies)
    }

    fetchDrama()
  }, [fetchMoviesByGenre])

  return (
    
    <div>
      <Slideshow slides={topTen} interval={10000} />
      <Drama data={dramaRomance}/>

    </div>
  )
}

export default page