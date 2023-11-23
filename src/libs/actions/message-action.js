const messageActions = {
    GET_MESSAGES: async(payload,state,dispatch)=>{
        const res = await fetch('/api/messages');
        
        const data = await res.json();
       
       return prev =>({...prev,allMessages:data})
    },

    ADD_MESSAGE: async(payload,state,dispatch)=>{
       return{
         ...state,
         allMessages:[
            ...state.allMessages,
            payload.message
         ]
       }
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
    dispatch(messageActions.ADD_MESSAGE,{message})
   } 
}



export default messageActions