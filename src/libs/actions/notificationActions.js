const notificationActions = {
    GET_NOTIFICATIONS: async(payload,state,dispatch)=>{

        const res = await fetch('/api/messages/notifications');

        const data = await res.json();
       return{
        ...state,
        notifications:[
           ...data
        ]
       }
    },

    DELETE_NOTIFICATIONS: async(payload,state,dispatch)=>{
        console.log('DELETE_NOTIFICATION',payload)
        const res = await fetch('/api/messages/notifications',{
            method:'DELETE',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(payload)
        })

        dispatch(notificationActions.GET_NOTIFICATIONS,payload.sessionId)
        
    },
    GIVE_NOTIFICATIONS: async(payload,state,session,dispatch)=>{
        console.log('payload on GIVE_NOTIFICATIONS',payload)
        const res = await fetch('api/messages/notifications',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(payload)
        })
    },


}

export default notificationActions