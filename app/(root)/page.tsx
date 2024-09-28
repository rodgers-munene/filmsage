import React from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'


const Home = () => {
  const loggedIn = { firstName: "Rodgers"}
  return (
    <div>
      < Header 
      firstName={loggedIn?.firstName || "User"}/>
      <Sidebar 
      firstName={loggedIn.firstName || "User"}/>
    </div>
  )
}

export default Home