import styles from '@/components/messages/message-container/messageLayout.module.css'
import ProfileBar from '../profile/profilebar'
import ChatForm from '../textbox/chatform'

const MessageLayout = ({children,user})=>{
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
                  <ChatForm/>
               </div>
           </div>
        </div>
    )
}

export default MessageLayout