import React from 'react'
import Sidebar from "./Sidebar"
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='flex bg-white dark:bg-zinc-800 transition-all duration-500 overflow-x-hidden '>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Body