import React, { useState, useEffect } from 'react'
import { fetchMovieProviders } from '@/lib/data'

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
    
  // fetch movie providers useeffect

  useEffect(() => {
    const getProviders = async () =>{
      const streamProviders = await fetchMovieProviders(data.id)
      setMovieProviders(streamProviders.link)
    
      const providerTypes: Array<Provider['type']> = ['flatrate', 'buy', 'rent', 'ads'];
      const allProviders: Provider[] = providerTypes.flatMap((type) => (
        (streamProviders[type] || []).map((provider: { provider_name: string; logo_path: string }) => ({
            provider_name: provider.provider_name,
            logo_path: provider.logo_path,
            type,
        }))
      ))
      
      setStreamServices(allProviders)
    }
    getProviders()
  }, [data.id])

 console.log(streamServices);
 
  


  return (
    <div className='w-full h-72 border'>
        <div className=''>
            <h1>W</h1>
        </div>
    </div>
  )
}

export default MovieProviders 