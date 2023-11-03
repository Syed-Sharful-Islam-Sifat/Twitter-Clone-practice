import React from 'react'
import Sidebar from './layout/Sidebar'
import { useSession } from 'next-auth/react';
import Rightbar from './layout/Rightbar';
import MessageLayout from './messages/message-container/messageLayout';
const Layout = ({children, currentRoute, messageBox,user}) => {


  const {data:session} = useSession();

  

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
                  <h3>Please Select an User to start a converstation</h3>
                ):(
                  <MessageLayout user={user}/>
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