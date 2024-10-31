'use client'
import { sideBarProps } from '@/types'
import React, { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar: FC<sideBarProps> = ( { firstName, isOpen } ) => {
  const signedIn = {firstName: "RodgersM"}
  const pathname = usePathname()
  let Links = [
    {name: "Home", link: "/"},
    {name: "Movies", link: "/movies"},
    {name: "Tv Shows", link: "/tv-shows"},
    {name: "Trending", link: "/trending"},
    {name: "Favorites", link: "/favorites"}
  ]

  return (
    <div className={`sidebar bg-[#b4c0d6] dark:bg-[#0d0a2b] h-screen overflow-y-auto transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
       <div className="w-full flex flex-col justify-between">
          <div className='sidebar-items w-full h-screen'>
               <div className='sidebar-link'>
                {Links.map((link) =>(
                    <Link className= {`h-10 rounded-lg pl-2 pt-2 ${pathname === link.link ? 'text-gray-100 dark:text-gray-700 bg-gray-600': 'text-gray-700 dark:text-gray-100'}`} href={link.link}>{link.name}</Link>
                  ))}
               </div>
                <div className=''>
                    <h1 className='pl-5 text-gray-700 dark:text-gray-100'>
                    {signedIn && signedIn.firstName}
                    </h1>
                    {!signedIn && (
                      <div>
                        <button className='text-gray-700 dark:text-gray-100'>Login</button>
                        <button className='text-gray-700 dark:text-gray-100'>Sign Up</button>
                     </div>
                    )}
                </div>
          </div>

          
       </div>
    </div>
  )
}

export default Sidebar