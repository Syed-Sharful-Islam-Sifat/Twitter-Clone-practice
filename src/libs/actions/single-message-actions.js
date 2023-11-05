
const SingleMessageActions = {
  
    SEND_MESSAGE: async(payload,state,dispatch)=>{
      const res = await fetch(`/api/messages/${payload.messageId}`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })
      
      const data = await res.json();
      console.log('data payload and state on send message action',payload,state,data)
      
      return{
        ...state,
        message:{
          ...state.message,
          messages:[
            ...state.message.messages,
             data
          ]
        }
      }

    },
    GET_SINGLE_MESSAGE:async(payload,state,dispatch)=>{
      console.log('payload on GET_SINGLE_MESSAGE action',payload)
      const res = await fetch(`/api/messages/${payload.messageId}`);
      const data = await res.json();
      
      return {
        ...state,
        message:data
      }
    },

    
}

export default SingleMessageActions