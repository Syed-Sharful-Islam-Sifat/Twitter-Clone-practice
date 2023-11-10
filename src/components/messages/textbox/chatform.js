import styles from '@/components/messages/textbox/chatform.module.css'
import { useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import messageActions from '@/libs/actions/single-message-actions'
import { useActionDispatcher } from '@/hooks/use-action-dispatcher'
import { useSession } from 'next-auth/react'
const ChatForm  = ({messageId,userId,onChange,handleClick,text})=>{

 
    return(

   <div className={styles.main_container}>
     <div className={styles.chatForm}>
      <textarea className={styles.text} placeholder='Type messages' onChange={(e)=>onChange(e)} value={text}>
      </textarea>
      <div className={styles.send_icon} onClick={handleClick}>
          <AiOutlineSend size={24} style={{color:'white'}}/>
      </div>
     </div>
   </div>
    )
}

export default ChatForm