import { useActionDispatcher } from "@/hooks/use-action-dispatcher"
import messageActions from "@/libs/actions/single-message-actions"
import { useEffect } from "react"
import styles from '@/components/messages/single-message/single-message.module.css'
const SingleMessage = ({state})=>{

  if(!state.message.messages)return <h2>Loading...</h2>

  useEffect(()=>{
   console.log('useEffect ran of SingleMessage.js ',state)
  },[state])

  return(
    <div>
        {state.message.messages.map((singleMessage,i)=>{
            return(
                <div key={i} className={styles.messageContainer}>
                   <p className={styles.text}>{singleMessage.text}</p>
                </div>
            )
        })}
    </div>
  )
}

export default SingleMessage