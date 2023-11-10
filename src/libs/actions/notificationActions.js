const notificationActions = {
    GET_NOTIFICATIONS: async(payload,state,dispatch)=>{
       return{
        ...state
       }
    },

    DELETE_NOTIFICATIONS: async(payload,state,dispatch)=>{
        
        const updatedNotifications = state.notifications.filter((notification)=>notification!==payload)
        return{
            ...state,
            notifications:updatedNotifications
        }
    },
    GIVE_NOTIFICATIONS: async(payload,state,dispatch)=>{

        console.log('payload on GIVE_NOTIFICATIONS',payload,state)
       
        return{
            ...state,
            notifications:[
                ...state.notifications,
                payload.newMessage.senderId
            ]
        }
    },


}

export default notificationActions