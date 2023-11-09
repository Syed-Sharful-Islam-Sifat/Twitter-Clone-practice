import { useNotificationDispatcher } from "@/hooks/use-notification-dispatcher";
import { createContext } from "react"

export const NotificationContext = createContext();
export const NotificationProvider = ({children})=>{

    const[state,dispatch] = useNotificationDispatcher({
        notifications:[]
    })

    return(
        <NotificationContext.Provider value = {[state,dispatch]}>
            {children}
        </NotificationContext.Provider>
    )

}