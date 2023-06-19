import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='relative container p-4 mx-auto flex flex-col bg-gradient-to-r from-blue-500 to-gray-400 min-h-screen'>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
