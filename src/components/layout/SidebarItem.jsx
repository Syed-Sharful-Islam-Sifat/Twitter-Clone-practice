import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
const SidebarItem = ({href,label,Icon}) => {

  console.log(label)  
  
  const router = useRouter();
  const {data: session} = useSession();

  const handleClick = ()=>{
    if(label==='Profile'){

      router.push(`/users/${session.id}`);
      console.log('router query',router.query)
    }

    if(label==='Home'){
      router.push('/Home')
    }

    if(label==='Logout'){

      console.log('logout clicked',label)
      signOut({redirect: false}).then(()=>{
        router.push('/')
      })
    }
  }
  
  return (
    <div className='sidebar-items'onClick={handleClick}>
      <div className='item'>
        <Icon size={24} color='white'/>
        <p className='item-paragraph'>{label}</p>
      </div>
    </div>
  )
}

export default SidebarItem