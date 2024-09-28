'use client'
import { sideBarProps } from '@/types'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = ( { firstName }: sideBarProps ) => {
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
    <div className='sidebar bg-gray-900'>
       <div className="w-full flex flex-col justify-between">
          <div className='sidebar-link w-full h-screen'>
                {Links.map((link) =>(
                  <Link className= {`h-10 rounded-lg pl-2 pt-2 ${pathname === link.link ? 'text-black bg-blue-300': ''}`} href={link.link}>{link.name}</Link>
                ))}
            
          </div>

          <div className='sidebar-link'>
          {signedIn && signedIn.firstName}
          {!signedIn && (
            <div>
            <button>Login</button>
            <button>Sign Up</button>
            </div>
          )}
          </div>
       </div>
    </div>
  )
}

export default Sidebar