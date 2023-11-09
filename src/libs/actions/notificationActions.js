const notificationActions = {
    GET_USERS: async(payload,state,dispatch)=>{
        const res = await fetch('/api/messages/notifications');
  
        const data = await res.json();
       return{
        ...state,
  
        notifications:[
           ...state.notifications,
           data
        ]
       }
    },

    DELETE_NOTIFICATIONS: async(payload,state,dispatch)=>{
        const res  = await fetch('/api/messages/notifications')
    }
}

export default notificationActions