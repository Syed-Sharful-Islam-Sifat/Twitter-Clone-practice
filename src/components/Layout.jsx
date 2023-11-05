import React, { useEffect,useState } from 'react'
import Sidebar from './layout/Sidebar'
import { useSession } from 'next-auth/react';
import Rightbar from './layout/Rightbar';
import MessageLayout from './messages/message-container/messageLayout';
import SelectUser from './messages/selectuser/selectuser';
import SingleMessage from './messages/single-message/single-message';
import messageActions from '@/libs/actions/single-message-actions';
import { useSingleMessageActionDispatcher } from '@/hooks/use-singlemessage-dispatcher';
import SingleMessageActions from '@/libs/actions/single-message-actions';
const Layout = ({children, currentRoute, messageBox,user,messageId}) => {

  const {data:session} = useSession();
  
   
    const[state,dispatch] = useSingleMessageActionDispatcher({
      message:{
         messages:[
          
         ]
      }
    })

    useEffect(()=>{
       console.log('useEffect ran of Layout.jsx file',messageId)
      if(messageId)
      dispatch(SingleMessageActions.GET_SINGLE_MESSAGE,{messageId})
    },[messageId])
     
    const [text,setText] = useState('');

     const onTextChange = (e)=>{
       setText(e.target.value);
     }
     const handleClick = async()=>{
       
    await  dispatch(messageActions.SEND_MESSAGE,{messageId,
       senderId: session.id,
       receiverId: user._id,
       text:text
      })

      console.log('after sending message current state',state)
      setText('')
     }

   
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
                  <MessageLayout user={user} messageId={messageId} onChange={onTextChange} handleClick={handleClick} text={text}>
                    <SingleMessage state={state}/>
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