import { useRouter } from 'next/router'
import React from 'react'
import {BsTwitter} from 'react-icons/bs'
import { RiTwitterXFill } from 'react-icons/ri'
const SidebarLogo = () => {

    const router = useRouter();
  return (
    <div className='sidebar-logo' onClick={()=>router.push('/Home')}>
        <RiTwitterXFill size = {28} color='white'/>
    </div>
  )
}

export default SidebarLogo