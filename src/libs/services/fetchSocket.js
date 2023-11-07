import { io } from "socket.io-client";
let socket
export async function fetchSocket(){
   if(!socket){
    await fetch('/api/socket');
    socket = io();
   }
    return socket;
}