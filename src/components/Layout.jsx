import React from 'react'
import Sidebar from './layout/Sidebar'
import { useSession } from 'next-auth/react';
import Rightbar from './layout/Rightbar';
import MessageLayout from './messages/message-container/messageLayout';
import SelectUser from './messages/selectuser/selectuser';
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
                  <SelectUser/>
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