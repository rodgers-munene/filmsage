import React, { useEffect, useState } from 'react'
import { FetchTrending } from '@/lib/data'
import Image from 'next/image'

type MovieData = {
    poster_path: string,
    title: string,
    id: number,
    genre: string,
    release_date: string
    vote_average: number,
    overview: string,
    vote_count: number;
}

type TrendingMoviesProps = {
    type: 'tv' | 'movie'
}
type Timeline = 'day' | 'week'

const TrendingMovies = ( {type}: TrendingMoviesProps) => {
    const [dailyTrending, setDailyTrending] = useState<MovieData[]>([])
    const [currentTimeLine, setCurrentTimeline] = useState<Timeline>('day')
    const [loading, setLoading] = useState(false)
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185'

    // functions 
    function formatNumber(num: number) {
        return num.toString().padStart(2, '0');
    }

    const formatVoteCount = (voteCount: number) => {
        if (voteCount >= 1000) {
          return (voteCount / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return voteCount.toString();
      }

    useEffect( ()=>{
        setLoading(true)
        const getData = async () => {
            const getTrending = await FetchTrending('movie', currentTimeLine)

            setDailyTrending(getTrending)
            
        }
        getData()
        setLoading(false)
        
    }, [currentTimeLine])

    
    
  return (
    <div className='pb-2'>
        <div className='flex justify-between px-4 items-center mt-2'>
            <h1 className='text-xl font-bold text-pink-400'>Top 10</h1>
            <div className='h-10'>
                <button
                onClick={() => {
                    setCurrentTimeline('day')
                }}
                 className={`w-16 h-full rounded-l-md ${currentTimeLine === 'day'? "bg-pink-400": "bg-gray-800"}`}>Today</button>
                <button
                 onClick={() => {
                    setCurrentTimeline('week')
                 }}
                 className={`w-16 h-full rounded-r-md ${currentTimeLine === 'week'? "bg-pink-400": "bg-gray-800"}`}>Week</button>
                
            </div>
        </div>
        {dailyTrending? dailyTrending.map((daily, index) => (
            <div className='flex h-24 items-center w-full px-4 '>
                <div className='w-10'>
                    <p className='text-lg font-bold'>{formatNumber(index + 1)}</p>
                </div>
                <div className='border-b w-full h-full border-gray-500 flex items-center'>
                    <div className=''>
                        <Image
                            src={`${IMAGE_BASE_URL}${daily.poster_path}`}
                            alt=''
                            width={50}
                            height={70}
                            priority
                            className='rounded-md'
                        >

                        </Image>
                    </div>
                    <div className='ml-4 flex flex-col w-2/3'>
                       <div className=''>
                        <h1 className='text-white mb-4 text-ellipsis text-sm'>{daily.title}</h1>
                       </div>
                        <div className=' flex items-center'>
                            <div className="w-10 h-5 flex bg-yellow-500 items-center justify-center rounded-md ">
                                <span className="text-black font-bold text-xs">IMDb</span>
                            </div>
                            <div className='px-2'>
                                <p className='text-sm text-gray-500'>{daily.vote_average.toFixed(1)} ({formatVoteCount(daily.vote_count)})</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )): "No data!"}
    </div>
  )
}

export default TrendingMovies