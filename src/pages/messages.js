import Header from "@/components/Header";
import Layout from "@/components/Layout"
import UsersItem from "@/components/messages/users/usersItem";
import { useState, useEffect, useContext } from "react"
import MessageLayout from "@/components/messages/message-container/messageLayout";
import { useActionDispatcher } from "@/hooks/use-action-dispatcher";
import { useSession } from "next-auth/react";
import messageActions from "@/libs/actions/message-action";
import { NotificationContext } from "@/providers/notificationProvider";
import notificationActions from "@/libs/actions/notificationActions";
import SingleMessage from "@/components/messages/single-message/single-message";
import SingleMessageActions from "@/libs/actions/single-message-actions";
import { useSocket } from "@/providers/socketProvider";
import { useMessage } from "@/providers/messageProvider";
const Messages = () => {

  const [users, setUsers] = useState();
  const [messageBox, setMessageBox] = useState(false);
  const [singleUser, setSingleUser] = useState();
  const[messageId,setMessageId] = useState('')
  const { data: session } = useSession();
  const[user,SetUser] = useState();
  const[stateMessage,dispatchMessage] = useMessage();
  const [state, dispatch] = useActionDispatcher({
    allMessages: [
       
    ],
    
  })

  const[notifyState,dispatchNotify] = useContext(NotificationContext);
  const socket = useSocket();
  
  useEffect(() => {
    dispatch(messageActions.GET_MESSAGES);
    
  }, [messageId])

  useEffect(()=>{
    if(socket){
      console.log('socket on useEffect',stateMessage,socket)
    socket.on("seen message",(userId,messageId)=>{
      console.log('seen message',messageId)
       dispatchMessage(SingleMessageActions.GET_SINGLE_MESSAGE,{messageId})
    })

    return () => {
      socket.off('seen');
    };
  }
  },[user,socket,dispatchMessage])

  console.log('socket on messages.js',state)
 
  console.log('state on message.js',state.allMessages)
  const handleClick = async (user) => {
   
    SetUser(user)
   
    const isPresent = state.allMessages.filter((message) =>
      (message.firstUserId === session.id && message.secondUserId === user._id) ||
      (message.firstUserId === user._id && message.secondUserId === session.id));    
     
      console.log('isPresent on message.js file',isPresent);
     if(!isPresent.length){
       console.log('session and userId on messages.js file',session.id,user._id)
       await dispatch(messageActions.CREATE_MESSAGE,{firstUserId:session.id,secondUserId:user._id})
     }
    setMessageBox(true);
    setSingleUser(user);
    if(isPresent.length)
    setMessageId(isPresent[0]._id);

    dispatchNotify(notificationActions.DELETE_NOTIFICATIONS,{sessionId:session.id,userId:user._id})
    dispatch(SingleMessageActions.USER_SELECTED,{newMessage:null,session,messageId: isPresent[0]._id,userSelected:true});
    
   
    socket.emit("seenMessage",{
      userId:user._id,
      messageId:isPresent[0]._id
    })
    
    
  }
  useEffect(() => {
    fetchUsers();
  }, [])

  async function fetchUsers() {
    const res = await fetch(`/api/users`);
    const data = await res.json();

    setUsers(data)
  }


  if (!users) return <h1>Loading...</h1>

  return (
    <Layout currentRoute={'Messages'} messageBox={messageBox} user={singleUser} messageId = {messageId} >
      <Header label={'Messages'} />
      {users.map((user) => {
        return (
          <div onClick={() => handleClick(user)} key={user._id}>
            <UsersItem user={user} />
          </div>
        )
      })}
    </Layout>
  )

}

export default Messages 