
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

      console.log('payload on UPDATE_MESSAGE_HISTORY',payload);
      const res = await fetch('api/messages/')
      if(payload.messageId!==payload.newMessage.id)return{
        ...state
      }

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
          seen:true,
          userId:payload.newMessage.senderId
        }
      }
    },
    
    GET_SINGLE_MESSAGE:async(payload,state,dispatch)=>{
      console.log('payload on GET_SINGLE_MESSAGE action',payload)
      const res = await fetch(`/api/messages/${payload.messageId}`);
      const data = await res.json();
      
      return {
        ...state,
        message:data,
        lastMessage:{
         seen:true,
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
          seen:false,
          user: payload.senderId
        }
      }
    }

    
}

export default SingleMessageActions