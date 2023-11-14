
const SingleMessageActions = {
  
    SEND_MESSAGE: async(payload,state,dispatch)=>{

      console.log('payload on SEND_MESSAGE action',payload)
      const res = await fetch(`/api/messages/${payload.messageId}`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })
      
      const data = await res.json();

     
      console.log('data on SEND_MESSAGE_ACTION',state,data);
      return{
        ...state,
        message:{
          ...state.message,
          messages:[
            ...state.message.messages,
            data
          ],
        },
        lastMessage:{
          seen: data.lastMessage.seen,
          userId:data.senderId
        }
      }

    },

    UPDATE_MESSAGE_HISTORY: async(payload,state,dispatch)=>{

      // if(payload.session.id===payload.newMessage.senderId){
      //   console.log('state on UPDATE_MESSAGE_HISTORY',state)
      //   return{
      //     ...state
      //   }
      // }
      
      const res = await fetch(`api/messages/${payload.messageId}`,{
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })
      const data = await res.json();
      console.log('data on UPDATE_MESSAGE_HISTORY',data)

      const seen = payload.session.id===payload.receiverId?'true':'false'
      console.log('seen payload.session.id and payload.receiverId',seen,payload.session.id,payload.receiverId)

      return{
        ...state,
        message:{
          ...state.message,
          messages:[
            ...state.message.messages,
            payload.newMessage
          ]
        },
        lastMessage:{
          seen:seen,
          userId:payload.newMessage.senderId
        }
      }
    },

    GET_SINGLE_MESSAGE:async(payload,state,dispatch)=>{
      console.log('payload on GET_SINGLE_MESSAGE action',payload)
      const res = await fetch(`/api/messages/${payload.messageId}`);
      const data = await res.json();
      console.log('data on GETSINGLEMESSAGE',data)
      return {
        ...state,
        message:data,
        lastMessage:{
         seen:data.lastMessage.seen,
         userId:data.lastMessage.userId
        }
      }
    },

    USER_SELECTED: async(payload,state,dispatch)=>{
      console.log('payload on GET_SINGLE_MESSAGE action',payload)
      const res = await fetch(`/api/messages/${payload.messageId}`,{
        method:'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      console.log('data on USER_SELECTED',data)
      
      return {
        ...state,
        message:data,
        lastMessage:{
         seen:'true',
         userId:data.lastMessage.userId
        }
      }
    },

    GIVE_NOTIFICATION:async(payload,state,dispatch)=>{
      console.log('payload on GIVE_NOTIFICATION',state);
    
      return {
        ...state,
        message:{
          ...state.message,
        },
        lastMessage:{
          seen:'false',
          user: payload.senderId
        }
      }
    },

    SET_SOCKET: async(payload,state,dispatch)=>{
        return{
          ...state,
          socket:payload.socket
        }
    }

    
}

export default SingleMessageActions