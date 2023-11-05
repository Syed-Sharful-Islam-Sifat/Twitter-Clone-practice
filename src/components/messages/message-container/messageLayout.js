import styles from '@/components/messages/message-container/messageLayout.module.css'
import ProfileBar from '../profile/profilebar'
import ChatForm from '../textbox/chatform'
import { useActionDispatcher } from '@/hooks/use-action-dispatcher'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
const MessageLayout = ({children,user,messageId,onChange,handleClick,text})=>{
    
    return (
        <div className={styles.main_container}>
           <div className={styles.grid_container}>
               <div className={styles.profile}>
                   <ProfileBar user={user}/>
               </div>

               <div className={styles.message_container}>
                {children}
               </div>

               <div className={styles.form_container}>
                  <ChatForm messageId={messageId} userId={user._id} onChange={onChange} handleClick={handleClick} text={text}/>
               </div>
           </div>
        </div>
    )
}

export default MessageLayout