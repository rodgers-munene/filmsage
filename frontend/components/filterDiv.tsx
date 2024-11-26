import React, { useEffect, useState } from 'react'
import { fetchGenres } from '@/lib/data'

type Genre = {
  id: number;
  name: string;
};


const FilterDiv = () => {
  const[genres, setGenres] = useState<Genre[]>([])

  useEffect(() =>{
    const getData = async () =>{
      const genresData = await fetchGenres()

      setGenres(genresData.genres )

    }
    getData()
    
  }, [])
  return (
    <div className='w-screen h-20 ml-14 mt-14 items-center'>
      <div className='filterDiv h-full overflow-auto flex justify-evenly items-center no-scrollbar'>
        {genres? genres.map((genre) => (
        <div className='min-w-32 flex justify-center items-center mr-4'>
           <button className='bg-gray-300 px-2 py-1 w-full text-black rounded-lg'>{genre.name}</button>
        </div>
      )): "loading"}

      </div>
    </div>
  )
}

export default FilterDiv