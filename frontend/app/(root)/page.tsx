'use client'
import React, { useState, useEffect } from 'react'
import Slideshow from '@/components/home-section/SlideShow'
import { fetchTrending } from '@/lib/data'


const page = () => {
  const [topTen, setTopTen] = useState([]);


  // update the state function
  useEffect(() => {
    const fetchTopTen = async () =>{
      const data = await fetchTrending('movie', 'day');
      setTopTen(data);
    }

    fetchTopTen();
  }, [fetchTrending]);

  return (
    
    <div>
      <Slideshow slides={topTen} interval={10000} />

    </div>
  )
}

export default page