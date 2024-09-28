'use client'
import React from 'react'
import { useEffect } from 'react'

const Movies = () => {
    const api_Key =  "8a9a73975712fdf6189836b3a627ac9b"

    async function tvShowsList(){
        const result = await fetch("https://api.themoviedb.org/3/discover/tv?api_key=8a9a73975712fdf6189836b3a627ac9b")
        const data = await result.json()
        console.log(data);
    }

    useEffect(() => {
        tvShowsList()
    }, [])
  return (
    <div>
        
    </div>
  )
}