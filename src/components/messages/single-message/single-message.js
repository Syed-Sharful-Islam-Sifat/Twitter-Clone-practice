import { useActionDispatcher } from "@/hooks/use-action-dispatcher"
import messageActions from "@/libs/actions/message-actions"
import { useEffect } from "react"
import styles from '@/components/messages/single-message/single-message.module.css'
const SingleMessage = ({messageId,dispatch,state})=>{

  useEffect(()=>{
    dispatch(messageActions.GET_SINGLE_MESSAGE,{messageId});
  },[])

  //console.log('state on single-message.js',state,messageId)

  return(
    <div>
        {state.message.messages?.map((singleMessage)=>{
            return(
                <div>
                   <p className={styles.text}>{singleMessage.text}</p>
                </div>
            )
        })}
    </div>
  )
}

export default SingleMessage