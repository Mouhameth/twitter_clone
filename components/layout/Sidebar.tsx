"use client";

import React from 'react'
import {BsBellFill, BsHouseFill} from "react-icons/bs"
import {FaUser} from "react-icons/fa"
import {BiLogOut} from "react-icons/bi"
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';
import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';

const Sidebar = () => {

  const { data: currentUser} = useCurrentUser();
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill
    },
    {
      label: "Notification",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification
    },
    {
      label: "Profile",
      href: "/profile",
      icon: FaUser,
      auth: true
    }
  ]
  return (
    <div className=' h-full pr-4 md:pr-6'>
       <div className="flex flex-col items-end">
         <div className="space-y-2 lg:w-[230px]">
            <SidebarLogo />
            {items.map((item) =>(
              <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
              alert={item.alert}
              />
            ))}
            {currentUser &&  (<SidebarItem
                              label="logout"
                              icon={BiLogOut}
                              onClick={() => { signOut()}}
                              />)
            }

            <SidebarTweetButton />   
         </div>
       </div>
    </div>
  )
}

export default Sidebar