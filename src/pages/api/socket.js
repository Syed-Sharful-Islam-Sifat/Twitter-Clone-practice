import { Server } from "socket.io"
const SocketHandler = async (req, res) => {
  let io;
  if (res.socket.server.io) {
  
    console.log('Socket is already running');
    
    res.socket.on('connection',()=>{
      console.log('server gets connected')
    })
  } else {
    console.log('Socket is initializing')
     io = new Server(res.socket.server);
     io.on('connection',socket=>{
      console.log('connected to socket io');
      
      
      socket.on("setup",(session)=>{
        socket.join(session.id);
        console.log(`A socket has been created for user ${session.id}`)
        socket.emit("connected")
      })
      
      socket.on("join_chat",(room)=>{
          socket.join(room);
         
          
      })

      socket.on('leave_chat', (room) => {
        socket.leave(room);

      });

      socket.on("new_message",(newMessage,messageId)=>{ 
        io.to(newMessage.id).emit("message received",newMessage,messageId)
      
        console.log('newMessage and mainMessageId on new_message socket',newMessage)
      })

      socket.on("notification",(newMessage,messageId)=>{
        
        io.to(newMessage.receiverId).emit("notification received",newMessage,messageId);
        console.log("notification on socket",newMessage);
      })

      socket.on("seenMessage",(user)=>{

         const {userId,messageId} = user

         console.log('on seenMessage',userId,messageId)
          io.to(messageId).emit("seen message",userId,messageId)
      })
      socket.on("messageSeen",(user)=>{

         const {messageId} = user
         console.log('messageSeen',messageId)
         console.log('on seenMessage',messageId)
          io.to(messageId).emit("message seen",messageId)
      })

      

     })

   
  }
  res.socket.server.io = io
  res.end()
}

export default SocketHandler