import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { NotificationContext } from '@/providers/notificationProvider';
import notificationActions from '@/libs/actions/notificationActions';

const SidebarItem = ({href,label,Icon}) => {

  const[notifyState,dispatchNotify] = useContext(NotificationContext);

  const {data:session} = useSession();
  useEffect(()=>{
    dispatchNotify(notificationActions.GET_NOTIFICATIONS,session.id)
   },[])

   console.log('state on sidebar',notifyState)
  
  const router = useRouter();
 

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
        <p className='item-paragraph'>{label}</p>
        {label==='Messages'&&notifyState.notifications.length?(
          <p className='notification'  style={{ backgroundColor: 'Green', borderRadius:'50%',color:'White',padding:'3px'}}>{notifyState.notifications.length}</p>
        ):(null)}
      </div>
    </div>
  )
}

export default SidebarItem