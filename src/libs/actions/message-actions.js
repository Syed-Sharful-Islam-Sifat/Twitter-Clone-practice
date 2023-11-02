
const messageActions = {
    GET_MESSAGES: async(payload,state,dispatch)=>{
        const data = await fetch('/api/messages');
       // dispatch(ADD_MESSAGE,data)
    },
    ADD_MESSAGE: async(payload,state,dispatch)=>{

    },
    SEND_MESSAGE: async(payload,state,dispatch)=>{
      const res = await fetch(`/api/messages/${payload}`,{
       method: 'POST',
       headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
      })

      const data = await res.json();

      dispatch(ADD_MESSAGE,data);
    }

    
}