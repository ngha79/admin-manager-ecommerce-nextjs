'use client'

import React from 'react'
import { UserDropdown } from '../UserDropdown'

const Navbar = () => {
  return (
    <div className="w-full z-20 py-4 bg-background shadow-md h-16 flex items-center justify-end px-4 md:px-12 sticky top-0 left-0">
      <UserDropdown />
    </div>
  )
}

export default Navbar
