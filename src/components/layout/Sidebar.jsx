import React from 'react'
import {BsHouseAddFill}  from 'react-icons/bs'
import {FaUser}  from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi'
import { AiOutlineInbox } from 'react-icons/ai'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiNotification } from 'react-icons/bi'
import { RiNotification2Fill } from 'react-icons/ri'
const Sidebar = () => {

  const items = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseAddFill
    },
    {
      label: 'Profile',
      href: '/user/123',
      icon: FaUser
    },{
      label: 'Messages',
      href: '/messages',
      icon: AiOutlineInbox
    },

    {
      label: 'Notifications',
      href: '/notification',
      icon: RiNotification2Fill
    },
   ,{
      label: 'Explore',
      href: '/explore',
      icon: AiOutlineSearch
    },
  ]
  return (
    <div className='left-side-content'>
      <SidebarLogo/>

      {items.map((item)=>{
       return <SidebarItem key = {item.href} label={item.label} Icon={item.icon} />
      })}

      <SidebarItem label="Logout" Icon={BiLogOut}/>
    </div>
  )
}

export default Sidebar