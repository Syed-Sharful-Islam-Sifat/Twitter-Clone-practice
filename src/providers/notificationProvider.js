import { useNotificationDispatcher } from "@/hooks/use-notification-dispatcher";
import { createContext } from "react"

export const NotificationContext = createContext();
export const NotificationProvider = ({children})=>{

    const[notifyState,dispatchNotify] = useNotificationDispatcher({
        notifications:[]
    })

    return(
        <NotificationContext.Provider value = {[notifyState,dispatchNotify]}>
            {children}
        </NotificationContext.Provider>
    )

}