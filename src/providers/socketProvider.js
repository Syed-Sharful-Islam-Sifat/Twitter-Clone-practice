import { fetchSocket } from '@/libs/services/fetchSocket';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const SocketContext = createContext();
let socketConnection
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const{data: session} = useSession();

  useEffect(()=>{
    socketInitializer();

  },[])

  const socketInitializer = async () => {
    const ss = await fetchSocket();
    console.log('ss on socketInitializer',ss);
    setSocket(ss);
    
  }

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
