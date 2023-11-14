import { useActionDispatcher } from "@/hooks/use-action-dispatcher";
import messageActions from "@/libs/actions/single-message-actions";
import { useEffect, useRef } from "react";
import styles from "@/components/messages/single-message/single-message.module.css";
import { useSession } from "next-auth/react";
import { useMessage } from "@/providers/messageProvider";

const SingleMessage = () => {

  const [state,dispatch] = useMessage();
  if (!state.message.messages) return <h2>Loading...</h2>;
   
  const { data: session } = useSession();
  const messageContainerRef = useRef();
  console.log('state on SingleMessage',state.lastMessage.seen,state.lastMessage.userId,session.id)

  useEffect(() => {
    const container = messageContainerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [state]);

  return (
    <div className={styles.messageContainer} ref={messageContainerRef}>
      {state.message.messages.map((singleMessage, i) => {
        return (
          <div className={styles.mainContainer} key={i}>
            <div key={i} className={styles.textContainer}>
              {singleMessage.senderId === session.id ? (
                <p className={styles.textOwner}>{singleMessage.text}</p>
              ) : (
                <p className={styles.textOther}>{singleMessage.text}</p>
              )}
            </div>
            {singleMessage.senderId===session.id&&i===state.message.messages.length-1?
             (
              <div className={styles.seenUnseen}>
               
                 {state.lastMessage.seen==='true'&&state.lastMessage.userId===session.id?(
                   
                   <p>Seen</p>
                 ):(
                  <p>Sent</p>
                 )
                 
                 }
              </div>
             ):null
          }
          </div>
        );
      })}
    </div>
  );
};

export default SingleMessage;
