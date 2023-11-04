import React from 'react'
import Sidebar from './layout/Sidebar'
import { useSession } from 'next-auth/react';
import Rightbar from './layout/Rightbar';
import MessageLayout from './messages/message-container/messageLayout';
import SelectUser from './messages/selectuser/selectuser';
import SingleMessage from './messages/single-message/single-message';
import { useActionDispatcher } from '@/hooks/use-action-dispatcher';
const Layout = ({children, currentRoute, messageBox,user,messageId}) => {


  const {data:session} = useSession();
  
  const [state,dispatch] = useActionDispatcher({
    message:{

    }
  })

  return (
    <>
    {(session)?(


    <div className='mainscreen'>
       <div className='grid-container'>
        <div className='left-sidebar'>
            <Sidebar/>
        </div>
         <div className='main-content'>
          {children}
         </div>

         <div className='right-sidebar'>
            <div className='right-sidebar-content'>
              {currentRoute ==='Messages'?(
                !messageBox?(
                  <SelectUser/>
                ):(
                  <MessageLayout user={user} messageId={messageId}>
                    <SingleMessage messageId={messageId} dispatch={dispatch} state={state}/>
                  </MessageLayout>
                )
              ):<Rightbar/>}
            </div>
         </div>

       </div>
    </div>
    ):null}
    </>
  )
}

export default Layout