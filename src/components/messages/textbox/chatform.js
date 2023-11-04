import styles from '@/components/messages/textbox/chatform.module.css'
import { useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import messageActions from '@/libs/actions/message-actions'
import { useActionDispatcher } from '@/hooks/use-action-dispatcher'
import { useSession } from 'next-auth/react'
const ChatForm  = ({messageId,userId})=>{

  const [message,setMessage] = useState('');
  const {data:session} = useSession();
  const[state,dispatch] = useActionDispatcher({
    message:{

    }
  })
   const handleClick = async()=>{
     
    dispatch(messageActions.SEND_MESSAGE,{messageId,
     senderId: session.id,
     receiverId: userId,
     text:message
    })
   }
    return(

   <div className={styles.main_container}>
     <div className={styles.chatForm}>
      <textarea className={styles.text} placeholder='Type messages' onChange={(e)=>setMessage(e.target.value)}>
      </textarea>
      <div className={styles.send_icon} onClick={handleClick}>
          <AiOutlineSend size={24} style={{color:'white'}}/>
      </div>
     </div>
   </div>
    )
}

export default ChatForm