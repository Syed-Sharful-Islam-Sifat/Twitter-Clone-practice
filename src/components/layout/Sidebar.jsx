import React from 'react'
import {BsHouseAddFill}  from 'react-icons/bs'
import {FaUser}  from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
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
    }
  ]
  return (
    <div className='left-side-content'>
      <SidebarLogo/>

      {items.map((item)=>{
       return <SidebarItem key = {item.href} label={item.label} Icon={item.icon}/>
      })}

      <SidebarItem label="Logout" Icon={BiLogOut}/>
    </div>
  )
}

export default Sidebar