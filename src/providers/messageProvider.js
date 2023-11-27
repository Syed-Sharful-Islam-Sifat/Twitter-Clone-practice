import { useActionDispatcher } from "@/hooks/use-action-dispatcher";
import { useNotificationDispatcher } from "@/hooks/use-notification-dispatcher";
import { createContext, useContext } from "react"
import { useSocket } from "./socketProvider";

export const  MessageContext = createContext();

export const useMessage = ()=>{
    return useContext(MessageContext)
}
export const MessageProvider = ({children})=>{
    
    const socket = useSocket();
    const[state,dispatch] = useActionDispatcher({
       message:{
          messages: []
       },
       lastMessage:{
          seen: 'false',
          userId: null
       },
       socket
    })

    return(
        <MessageContext.Provider value = {[state,dispatch]}>
            {children}
        </MessageContext.Provider>
    )

}