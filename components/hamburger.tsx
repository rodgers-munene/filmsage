import { HamburgerButtonProps } from '@/types'
import React, { FC } from 'react'

const Hamburger: FC<HamburgerButtonProps> = ( { isOpen, onClick } ) => {
  return (
    <button  className={`flex flex-col justify-center items-center w-10 h-10 focus:outline-none ${isOpen ? "open" : ""}`} 
    onClick={onClick}> 
      
   <span className={`block w-8 mb-1 h-1 bg-gray-700  dark:bg-gray-100 transition-transform duration-300`}></span>

    <span className={`block w-8 h-1 bg-gray-700 dark:bg-gray-100 transition-opacity duration-300`}></span>

    <span className={`block w-8 h-1 mt-1 bg-gray-700 dark:bg-gray-100 transition-transform duration-300`}></span>
  </button>
  )
}

export default Hamburger