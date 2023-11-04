
const messageActions = {
    GET_MESSAGES: async(payload,state,dispatch)=>{
        const res = await fetch('/api/messages');

        const data = await res.json();
       return prev =>({...prev,allMessages:data})
    },
    ADD_MESSAGE: async(payload,state,dispatch)=>{
        return prev=>({...prev,allMessages:[...prev.allMessages,payload]});
    },
    SEND_MESSAGE: async(payload,state,dispatch)=>{
      console.log('payload on send message action',payload)
      const res = await fetch(`/api/messages/${payload.messageId}`,{
       method: 'POST',
       headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
      })

      const data = await res.json();
      const {messageId} = payload
      dispatch(messageActions.GET_SINGLE_MESSAGE,{messageId})
      return prev=>({...prev,message:data});

    },
    GET_SINGLE_MESSAGE:async(payload,state,dispatch)=>{
      console.log('payload on GET_SINGLE_MESSAGE action',payload)
      const res = await fetch(`/api/messages/${payload.messageId}`);
      const data = await res.json();
      
      return prev=>({...prev,message:data})
    },

   CREATE_MESSAGE: async(payload,state,dispatch)=>{
    console.log('payload on create message action',payload)
    const res = await fetch(`/api/messages`,{
      method: 'POST',
       headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })
     
    const message = await res.json();
    console.log('message on create message action',message)
    dispatch(messageActions.ADD_MESSAGE,message)
   } 

    
}

export default messageActions