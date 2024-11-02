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
    <div className={`sidebar w-64 bg-[#b4c0d6] dark:bg-[#0d0a2b] h-screen overflow-y-auto  transition-transform duration-200 transform ${isOpen ? "translate-x-0 w-64 custom-scrollbar" : "-translate-x-52 hide-scrollbar"}`}>
       <div className="w-full flex flex-col justify-between">
          <div className='sidebar-items h-screen'>
               <div className={isOpen? "sidebar-link" : "flex flex-col w-56 gap-12 py-1"}>
                {isOpen? 
                Links.map((link, index) =>(
                  <Link className= {`h-10 rounded-lg flex pl-2 pt-2 ${pathname === link.link ? 'text-gray-100 dark:text-gray-700 bg-gray-600': 'text-gray-700 dark:text-gray-100'}`} href={link.link}>
                    <link.icon className='h-6 w-6' />
                    <span className='pl-2'>{link.name}</span>
                    </Link>
                )): 
                Links.map((link, index) => (
                  <Link href={link.link} title={link.name} className={`h-10 w-9 flex items-center justify-center ml-auto rounded-lg ${pathname === link.link? 'text-gray-100 dark:text-gray-700 bg-gray-600': 'text-gray-700 dark:text-gray-100'}`}>
                    <link.icon className='h-6 w-6'/>
                  </Link>
                ))
                }
               </div>
                <div className='relative w-56'>
                    {isOpen ? 
                    (<div className='flex pl-5'>
                      <UserIcon className='h-6 w-6 text-gray-700 dark:text-gray-100'/>
                      <h1 className='pl-1 text-gray-700 dark:text-gray-100'>
                      {signedIn && signedIn.firstName}
                      </h1>
                    </div>): 
                    (<div className='h-10 w-10 flex items-center justify-center ml-auto'>
                      
                      <UserIcon title={signedIn.firstName} className='h-6 w-6 text-gray-700 dark:text-gray-100'/>
                     
                     </div>)}
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