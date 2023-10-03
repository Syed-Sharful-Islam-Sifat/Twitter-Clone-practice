import { useRouter } from 'next/router'
import React from 'react'
import {BsTwitter} from 'react-icons/bs'

const SidebarLogo = () => {

    const router = useRouter();
  return (
    <div className='sidebar-logo' onClick={()=>router.push('/Home')}>
        <BsTwitter size = {28} color='white'/>
    </div>
  )
}

export default SidebarLogo