import { MovieCardProps } from '@/types'
import React from 'react'
import Image from 'next/image'
import '../../backend/public/images'


const MovieCard = ( { url, itemList, pageName } : MovieCardProps ) => {
    
  return (
    <div>
        <div className='container mx-auto p-4 mt-14 bg-gray-900 min-w-full'>
            <h1 className='text-3xl font-bold text-white mb-4'>{pageName}</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1'>
                {itemList? (itemList.map((item : any) => (
                    <div>
                    <Image 
                        src={item.image_path? `../b` : "/default-movie.webp"}
                        alt={item.title}
                        width={200}
                        height={350}
                        className='rounded-lg'
                        priority
                    />
                    <h3 className='text-md font-semibold mt-2 text-white'>{item.title}</h3>
                    </div>
                ))) : "Loading"}
            </div>
        </div>
    </div>
  )
}

export default MovieCard