import React, { useState, useEffect } from 'react'
import { fetchMovieProviders } from '@/lib/data'
import { PlayIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

interface Movie{
    id: number
    title: string
}

interface MovieProviderProps{
    data: Movie
}
interface Provider {
    logo_path: string;
    provider_name: string;
    type: 'flatrate' | 'buy' | 'rent' | 'ads';
  }

const MovieProviders  = ( {data}: MovieProviderProps ) => {
  const [movieProviders, setMovieProviders] = useState('')
  const [streamServices, setStreamServices] = useState<Provider[]>([])
  const [streamToggled, setIsStreamToggled] = useState<string>('all')
  const [availableProviders, setAvailableProviders] = useState<string[]>(['all'])
  const [message, setMessage] = useState('')
  

  const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w154';
 
  // function to toggle current provider type
  
  const toggleProvider = (providerName: string) => {
    setIsStreamToggled(providerName)
    if(!availableProviders.includes(providerName) || availableProviders.length === 1){
       setMessage('Not Available!!')      
    }else {
      setMessage('')
    }

  }
  // fetch movie providers useeffect

  useEffect(() => {
    const getProviders = async () =>{
      const streamProviders = await fetchMovieProviders(data.id)
      setMovieProviders(streamProviders.link)
    
      const providerTypes: Array<Provider['type']> = ['flatrate', 'buy', 'rent', 'ads'];

      const allProviders: Provider[] = [];
      const availableTypes: Set<Provider['type'] | 'all'> = new Set();
  
      // Process provider types and collect data
      providerTypes.forEach((type) => {
        const providers = streamProviders[type] || [];
        if (providers.length > 0) {
          availableTypes.add(type); // Track available provider types
          allProviders.push(
            ...providers.map((provider: { provider_name: string; logo_path: string }) => ({
              provider_name: provider.provider_name,
              logo_path: provider.logo_path,
              type,
            }))
          );
        }
      });
      // ensure all is always included in the available types array
      availableTypes.add('all');

      // Update state with results
      setStreamServices(allProviders); // Set all providers
      setAvailableProviders(Array.from(availableTypes)); // C
    }
    getProviders()
  }, [data.id])


  
  const filteredProviders = streamServices.filter((stream) => stream.type === streamToggled);
 
  


  return (
    <div className='w-full h-auto'>
        <div className='mt-4 ml-7'>
            <h1 className='text-xl uppercase font-bold'>Watch Now</h1>
            <div className='flex flex-col'>
              {/* buttons */}
              <div className='w-2/3 flex justify-between mt-5'>
                <button
                className={`px-4 py-1 rounded-lg text-gray-300 ${streamToggled === 'all'? "bg-red-600": "bg-gray-900"}`}
                onClick={() => {
                  toggleProvider('all')
                }}

                >All</button>
                <button
                className={`px-4 py-1 rounded-lg text-gray-300 ${streamToggled === 'flatrate'? "bg-red-600": "bg-gray-900"}`}
                onClick={() => {
                  toggleProvider('flatrate');
                }}
                >Subscription</button>
                <button
                className={`px-4 py-1 rounded-lg text-gray-300 ${streamToggled === 'buy'? "bg-red-600": "bg-gray-900"}`}
                onClick={() => {
                 toggleProvider('buy')
                }}
                >Buy</button>
                <button
                className={`px-4 py-1 rounded-lg text-gray-300 ${streamToggled === 'rent'? "bg-red-600": "bg-gray-900"}`}
                onClick={() => {
                  toggleProvider('rent')
                }}
                >Rent</button>
                <button
                className={`px-4 py-1 rounded-lg text-gray-300 ${streamToggled === 'ads'? "bg-red-600": "bg-gray-900"}`}
                onClick={() => {
                  toggleProvider('ads')
                }}
                >Ads</button>
              </div>
              {/* stream providers services */}
              <div className='relative mt-5  w-[90%] h-auto max-h-52 min-h-20 bg-gray-900 rounded-xl overflow-y-auto custom-scrollbar flex flex-col'>
                {(streamToggled === 'all' ? streamServices: filteredProviders).map((service) => (
                      <div className='w-full h-auto  flex items-center justify-between py-4 pr-3 pl-1 hover:bg-gray-800 rounded-xl'>
                        <Image
                        src={`${BACKDROP_BASE_URL}${service.logo_path}`}
                        alt={service.provider_name}
                        width={50}
                        height={70}
                        priority
                        className='rounded-lg'
                        >

                        </Image>
                        <p>{service.provider_name}</p>

                        <button className='flex bg-yellow-300 p-2 rounded-lg'><PlayIcon className='h-6 w-6'/> Watch Now</button>
                      </div>
                ))}
                  
                <p className='text-gray-500 pl-2 pt-2'>{message}</p>
                
              </div>
              
            
            </div>
        </div>
    </div>
  )
}

export default MovieProviders 