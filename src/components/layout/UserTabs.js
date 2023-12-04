"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const UserTabs = ({isAdmin}) => {

    const path = usePathname()
  return (
    <div className="flex gap-2 tabs justify-center">
    <Link href="/profile" className={path==="/profile"?"active":""} >Profile</Link>
    {
      isAdmin && (
        <>
         <Link href="/categories"  className={path==="/categories"?"active":""}  >Categories</Link>
         <Link href="/menu-items"  className={path.includes("/menu-items")?"active":""} >Menu Items</Link>
         <Link href="/users"  className={path==="/users"?"active":""}  >Users</Link>
        
        </>
      )
    }

   
  </div>
  )
}

export default UserTabs