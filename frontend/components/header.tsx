'use client'
import { navBarProps, User } from '@/types'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation' //used to determine if a link is active
import SearchBar from './search-bar'
import Hamburger from './hamburger'
import Sidebar from './sidebar'
import { useSidebar } from '@/context/SidebarContext'

const Header = ( { firstName }: navBarProps ) => {
    const pathname = usePathname()
    const [searchResult, setSearchResult] = useState('');
    const { isSidebarOpen, toggleSidebar } = useSidebar()

    const handleSearch = (query: any) => {
    // You can perform the search logic here (e.g., fetching results from an API)
    setSearchResult(`You searched for: ${query}`);
     };

  return (
    // bg-[#0d0a2b -backup background
    <div className='home-header bg-gray-950 dark:bg-[#0d0a2b] rounded-b-lg text-gray-200 dark:text-gray-100 h-14 border-b-2 border-white dark:border-black z-50'>
       <div className='w-full flex flex-row items-center ml-2'>
          <div className=''>
            < Hamburger isOpen={isSidebarOpen} onClick={toggleSidebar}/>
            < Sidebar isOpen={isSidebarOpen} firstName='Rodgers'/>
          </div>
          <div className='ml-4'>
            {/* <img src="" alt="" /> */}
          <h1 className='header-2'><Link href="/">FilmSage</Link></h1>
          </div>
       </div>
        <div className='w-full'>
            <SearchBar onSearch={handleSearch} />
            {searchResult && (
              <p className="mt-4 text-center text-lg font-medium text-gray-700">{searchResult}</p>
           )}
        </div>
        <div className='mr-12 w-full flex items-center justify-end'>
            {/* <img src="" alt="" /> */}
            <p>
                {firstName}
            </p>
        </div>
    </div>
  )
}

export default Header