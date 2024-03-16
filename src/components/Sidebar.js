import React from 'react'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const isMenuOpen = useSelector((store)=> store.app.isMenuOpen);
  if(!isMenuOpen){
    return null;
  }
  return (
    <div className=' w-48 shadow-lg '>
      <ul className='px-10 py-5 border-b-2'>
        <li className='py-2 font-semibold cursor-pointer hover:bg-gray-200 rounded-lg pl-2'>Home</li>
        <li className='py-2 font-semibold cursor-pointer hover:bg-gray-200 rounded-lg pl-2'>Shorts</li>
        <li className='py-2 font-semibold cursor-pointer hover:bg-gray-200 rounded-lg pl-2'>Subscription</li>
      </ul>
      <ul className='px-10 py-5 border-b-2'>
        <li className='py-2 font-semibold cursor-pointer hover:bg-gray-200 rounded-lg pl-2'>My Channel</li>
        <li className='py-2 font-semibold cursor-pointer hover:bg-gray-200 rounded-lg pl-2'>History</li>
        <li className='py-2 font-semibold cursor-pointer hover:bg-gray-200 rounded-lg pl-2'>Your videos</li>
        <li className='py-2 font-semibold cursor-pointer hover:bg-gray-200 rounded-lg pl-2'> History</li>
      </ul>
      <ul className='px-10 py-5 border-b-2'>
        {/* <h4 className='font-bold'>Explore</h4> */}
        <li className='py-2 font-semibold cursor-pointer hover:bg-gray-200 rounded-lg pl-2'>Trending</li>
        <li className='py-2 font-semibold cursor-pointer hover:bg-gray-200 rounded-lg pl-2'>Movies</li>
        <li className='py-2 font-semibold cursor-pointer hover:bg-gray-200 rounded-lg pl-2'>Shopping</li>
        <li className='py-2 font-semibold cursor-pointer hover:bg-gray-200 rounded-lg pl-2'> Gaming</li>
      </ul>
    </div>
  )
}

export default Sidebar