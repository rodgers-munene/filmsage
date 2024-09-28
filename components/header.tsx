'use client'
import { navBarProps, User } from '@/types'
import React, { use } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation' //used to determine if a link is active

const Header = ( { firstName }: navBarProps ) => {
    const pathname = usePathname()


  return (
    <div className='home-header bg-gray-900 text-white min-h-14 border-b-2 border-gray-400 '>
       <div>
        {/* hamburger button */}
         {/* <img src="" alt="" /> */}
         <h1 className='header-2 ml-12'><Link href="/">FilmSage</Link></h1>
       </div>
        <div>
            {/* search bar */}
        </div>
        <div className='mr-12'>
            {/* <img src="" alt="" /> */}
            <p>
                {firstName}
            </p>
        </div>
    </div>
  )
}

export default Header