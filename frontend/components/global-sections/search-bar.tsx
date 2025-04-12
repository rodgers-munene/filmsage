import { SearchBarProps } from '@/types'
import React from 'react'
import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const SearchBar = ( {onSearch}: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };
  

  return (
    
     <div className="relative h-full max-w-lg flex justify-center items-center">
        
        <button className="">
          <MagnifyingGlassIcon className="h-7 w-7 text-blue-700" />
        </button>
      </div>
  )
}

export default SearchBar