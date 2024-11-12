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
    <form action="" onSubmit={handleSearch} className='flex items-center w-full max-w-md max-auto my-4'>
     <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-10 px-4 pr-10 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
        />
        <button className="absolute right-1 top-1 bottom-1 bg-red-500 rounded-r-md px-3 hover:bg-gray-200">
          <MagnifyingGlassIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </form>
  )
}

export default SearchBar