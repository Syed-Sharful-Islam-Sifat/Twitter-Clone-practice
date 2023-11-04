import styles from '@/components/messages/message-container/messageLayout.module.css'
import ProfileBar from '../profile/profilebar'
import ChatForm from '../textbox/chatform'

const MessageLayout = ({children,user,messageId})=>{

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
                  <ChatForm messageId={messageId} userId={user._id}/>
               </div>
           </div>
        </div>
    )
}

export default MessageLayout