import React, { useEffect, useState } from 'react'
import { FetchTrending } from '@/lib/data'

type MovieData = {
    poster_path: string,
    title: string,
    id: number,
    genre: string,
    release_date: string
    vote_average: number,
    overview: string,
}

type TrendingMoviesProps = {
    type: 'tv' | 'movie'
}

const TrendingMovies = ( {type}: TrendingMoviesProps) => {
    const [dailyTrending, setDailyTrending] = useState<MovieData[]>([])
    const [weeklyTrending, setWeeklyTrending] = useState<MovieData[]>([])
    const [loading, setLoading] = useState(false)

    useEffect( ()=>{
        setLoading(true)
        const getData = async () => {
            const getDaily = await FetchTrending('movie', 'day')
            const getWeekly = await FetchTrending(type, 'week')

            setDailyTrending(getDaily)
            setWeeklyTrending(getWeekly)
        }
        getData()
        setLoading(false)
    }, [])

    
    console.log(dailyTrending)
  return (
    <div>
        {dailyTrending? dailyTrending.map((daily) => (
            <div>
                <h1 className='text-white'>{daily.title}</h1>
            </div>
        )): "Loading"}
    </div>
  )
}

export default TrendingMovies