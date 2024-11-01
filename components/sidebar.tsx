'use client'
import { sideBarProps } from '@/types'
import React, { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, FilmIcon, TvIcon, HeartIcon, UserIcon } from '@heroicons/react/20/solid'

const Sidebar: FC<sideBarProps> = ( { firstName, isOpen } ) => {
  const signedIn = {firstName: "RodgersM"}
  const pathname = usePathname()
  let Links = [
    {name: "Home", link: "/", icon: HomeIcon},
    {name: "Movies", link: "/movies", icon: FilmIcon},
    {name: "Tv Shows", link: "/tv-shows", icon: TvIcon},
    // {name: "Trending", link: "/trending", icon: },
    {name: "Favorites", link: "/favorites", icon: HeartIcon}
  ]

  return (
    <div className={`sidebar bg-[#b4c0d6] dark:bg-[#0d0a2b] h-screen overflow-y-auto transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
       <div className="w-full flex flex-col justify-between">
          <div className='sidebar-items w-full h-screen'>
               <div className='sidebar-link'>
                {Links.map((link) =>(
                    <Link className= {`h-10 rounded-lg flex pl-2 pt-2 ${pathname === link.link ? 'text-gray-100 dark:text-gray-700 bg-gray-600': 'text-gray-700 dark:text-gray-100'}`} href={link.link}>
                      <link.icon className='h-6 w-6' />
                      <span className='pl-2'>{link.name}</span>
                      </Link>
                  ))}
               </div>
                <div className=''>
                    <div className='flex pl-5'>
                      <UserIcon className='h-6 w-6 text-gray-700 dark:text-gray-100'/>
                      <h1 className='pl-1 text-gray-700 dark:text-gray-100'>
                      {signedIn && signedIn.firstName}
                    </h1>
                    </div>
                    {!signedIn && (
                      <div className='flex flex-col '>
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