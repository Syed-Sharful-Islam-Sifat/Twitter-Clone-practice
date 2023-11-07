import { getServerSession } from "next-auth";
import { Server } from "socket.io"
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req,res){

  if(req.method!=='GET'){
    return res.status(405).end();
  }

  try{
    const session = await getServerSession(req,res,authOptions);

    if(session){
     await SocketHandler(res);
     return res.status(200).json('ok')
    }
  }catch(error){
    console.log('Socket error',error);
    return res.status(400).end();
  }

}

export async function SocketHandler(res) {
  
  let io = res.socket.server.io;
  if(!io){
    const io = new Server(res.socket.server);

    io.on('connection',async(socket)=>{
      console.log('User gets connected');
    })
    res.socket.server.io = io
  }else{
    console.log('socket is already running')
  }

}
