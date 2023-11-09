import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useNotificationDispatcher } from '@/hooks/use-notification-dispatcher';
import { useEffect } from 'react';
import notificationActions from '@/libs/actions/notificationActions';
import { NotificationContext } from '@/providers/notificationProvider';
const SidebarItem = ({href,label,Icon}) => {

  const [state,dispatch] = useContext(NotificationContext)


  useEffect(()=>{
    dispatch(notificationActions.GET_USERS)
  },[])

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

    if(label==='Messages'){
      router.push('/messages');
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
        <p className={label==='Messages'?'item-paragraph-green':'item-paragraph'}>{label}</p>
      </div>
    </div>
  )
}

export default SidebarItem