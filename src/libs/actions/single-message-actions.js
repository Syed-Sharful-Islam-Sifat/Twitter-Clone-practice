
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
          ]
        }
      }

    },

    UPDATE_MESSAGE_HISTORY: async(payload,state,dispatch)=>{

      console.log('payload on UPDATE_MESSAGE_HISTORY',payload);

      return{
        ...state,
        message:{
          ...state.message,
          messages:[
            ...state.message.messages,
            payload
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