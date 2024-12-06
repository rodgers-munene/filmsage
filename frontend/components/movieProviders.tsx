import React, { useState, useEffect } from 'react'
import { fetchMovieProviders } from '@/lib/data'
import { Stream } from 'stream'

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
  const [streamToggled, setIsStreamToggled] = useState<string>('flatrate')
  const [availableProviders, setAvailableProviders] = useState<string[]>([])
  const [message, setMessage] = useState('')
  
 
  // function to toggle current provider type
  
  const toggleProvider = (providerName: string) => {
    setIsStreamToggled(providerName)
    if(!availableProviders.includes(providerName)){
       setMessage(`Not Available!!`)      
    }else{
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
      const availableTypes: Set<Provider['type']> = new Set();
  
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
  
      // Update state with results
      setStreamServices(allProviders); // Set all providers
      setAvailableProviders(Array.from(availableTypes)); // C
    }
    getProviders()
  }, [data.id])

 
  

 
  


  return (
    <div className='w-full h-72 border'>
        <div className=''>
            <h1>Watch Now</h1>
            <div className='flex flex-col'>
              {/* buttons */}
              <div className='w-2/3 flex justify-between'>
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
              <div>
              {streamServices?.map((service) => (
                <div>
                 {service.type === streamToggled && (
                  <p>{service.provider_name}</p>
                 )}
                </div>
              ))}
              <p>{message}</p>
              </div>
              
            
            </div>
        </div>
    </div>
  )
}

export default MovieProviders 