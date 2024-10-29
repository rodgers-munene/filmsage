'use client'
import React, { useState } from 'react'
import Header from '@/components/header'
import MovieCard from '@/components/movieCard'



const Movies = () => {
    const loggedIn = { firstName: "Rodgers"}
    const[movies, setMovies] = useState([])
    const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=ae068f4ef971b7e5066b4e6790067735"
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

    // lets fetch the top rated movies
    async function fetchMovies() {
      try {
        let response = await fetch(url)

        let data = await response.json()

        setMovies(data.results)
      } catch (error) {
          console.log("Error fetching data:", error); //error handling
      }
    }
    
    // lets fetch the trending movies


    // lets fetch the new releases


    // lets fetch the upcoming movies


    fetchMovies()


    return (
      <div>
        <div>
          < Header 
          firstName={loggedIn?.firstName || "User"}/>
        </div>
        <div>
        < MovieCard 
          url={IMAGE_BASE_URL}
          itemList={movies}
          pageName='MOVIES'
        />
        </div>
      </div>
    )
}

export default Movies