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
    <div className={`sidebar bg-gray-900 h-screen overflow-y-auto transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
       <div className="w-full flex flex-col justify-between">
          <div className='sidebar-items w-full h-screen'>
               <div className='sidebar-link'>
                {Links.map((link) =>(
                    <Link className= {`h-10 rounded-lg pl-2 pt-2 ${pathname === link.link ? 'text-black bg-blue-300': ''}`} href={link.link}>{link.name}</Link>
                  ))}
               </div>
                <div className=''>
                    <h1 className='pl-5'>
                    {signedIn && signedIn.firstName}
                    </h1>
                    {!signedIn && (
                      <div>
                        <button>Login</button>
                        <button>Sign Up</button>
                     </div>
                    )}
                </div>
          </div>

          
       </div>
    </div>
  )
}

export default Sidebar