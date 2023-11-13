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
          console.log(`user joined room ${room}`)
      })

      socket.on('leave_chat', (room) => {
        socket.leave(room);
        console.log(`user left room ${room}`);
      });

      socket.on("new_message",(newMessage)=>{ 
        io.to(newMessage.id).emit("message received",newMessage)
      
        console.log('newMessage and mainMessageId on new_message socket',newMessage)
      })

      socket.on("notification",(newMessage)=>{
        io.to(newMessage.receiverId).emit("notification received",newMessage);
        console.log("notification on socket",newMessage);
      })

      socket.on("seenUnseen",(newMessage)=>{
        io.to(newMessage.senderId).emit("seen unseen feature",newMessage);
        console.log('seen unseen on socket',newMessage)
      })

     })

   
  }
  res.socket.server.io = io
  res.end()
}

export default SocketHandler