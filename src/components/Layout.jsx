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
import { useSocket } from '@/providers/socketProvider';
const Layout = ({children, currentRoute, messageBox,user,messageId}) => {
  

  const {data:session} = useSession();
  const[send,setSend] = useState(false)
  const socket = useSocket();
  
   
    const[state,dispatch] = useSingleMessageActionDispatcher({
      message:{

         messages:[
          
         ],

        },
      socket
    })

    const [sendingMessage,setSendindMessage] = useState({
      senderId:null,
      receiverId: null,
      text:null
    })

    useEffect(()=>{
       console.log('useEffect ran of Layout.jsx file',messageId)
      if(messageId){
      dispatch(SingleMessageActions.GET_SINGLE_MESSAGE,{messageId})
      socket.emit('join_chat',messageId)
    }
    },[messageId])

  
    useEffect(()=>{

      socket.on("message received",(newMessage,mainMessageId)=>{
        if(messageId!==mainMessageId){
          // give notifications
        }else{
          console.log('useEffect ran on for message received',)
          dispatch(SingleMessageActions.UPDATE_MESSAGE_HISTORY,newMessage)
        }
      })
    
    setSend(false);
    })
     
    const [text,setText] = useState('');

     const onTextChange = (e)=>{
       setText(e.target.value);
     }
     const handleClick = async()=>{
    
      setSend(true)
    await  dispatch(messageActions.SEND_MESSAGE,{messageId,
       senderId: session.id,
       receiverId: user._id,
       text:text
      })

     

      console.log('after sending message current state',state,state.message._id);
      socket.emit("new_message",{
        senderId:session.id,
        receiverId: user._id,
        text:text
      },state.message._id)
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

         <div className={user?'':'right-sidebar'}>
            <div className={currentRoute==='Messages'&&!messageBox?'right-sidebar-content-message':'right-sidebar-content'}>
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