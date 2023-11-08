import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:3000";
export async function fetchSocket() {
   let socket
   
   if(!socket){
        await fetch('/api/socket')
        socket =  io();
        console.log('socket ',socket)
        socket.on('connect', () => {
            console.log('user gets connected');
          })
    }

  return socket;
}
