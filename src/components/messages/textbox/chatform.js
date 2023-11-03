import styles from '@/components/messages/textbox/chatform.module.css'
import { AiOutlineSend } from 'react-icons/ai'
const ChatForm  = ()=>{

    return(

   <div className={styles.main_container}>
     <div className={styles.chatForm}>
      <textarea className={styles.text} placeholder='Type messages'>
      </textarea>
      <div className={styles.send_icon}>
          <AiOutlineSend size={24}/>
      </div>
     </div>
   </div>
    )
}

export default ChatForm