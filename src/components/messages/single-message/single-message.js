import { useActionDispatcher } from "@/hooks/use-action-dispatcher"
import messageActions from "@/libs/actions/single-message-actions"
import { useEffect ,useRef} from "react"
import styles from '@/components/messages/single-message/single-message.module.css'
import { useSession } from "next-auth/react"
const SingleMessage = ({state})=>{

  if(!state.message.messages)return <h2>Loading...</h2>

  const {data:session} = useSession();

  const messageContainerRef = useRef();

  useEffect(()=>{
    const container = messageContainerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  },[state])

  return(
    <div className={styles.messageContainer} ref={messageContainerRef}>
        {state.message.messages.map((singleMessage,i)=>{
            return(
                <div key={i} className={styles.textContainer}>
                   {singleMessage.senderId===session.id?(
                      <p className={styles.textOwner}>{singleMessage.text}</p>
                   ):(
                    <p className={styles.textOther}>{singleMessage.text}</p>
                   )}
                 
                </div>
            )
        })}
    </div>
  )
}

export default SingleMessage