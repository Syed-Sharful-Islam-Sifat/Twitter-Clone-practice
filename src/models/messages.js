import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  firstUserId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  secondUserId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  messages:[
    {
      senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
        text:{
            type: String
        },

        image:{
            type: String
        },
        seen: {
           type: Boolean,
           default: false
        },
       
    },

    {
      timeStamps: true
    }
    
  ]
},
{
  timeStamps:true
}


)

const Message = mongoose.models?.Message || mongoose.model('Message',messageSchema);
export default Message