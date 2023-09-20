import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    name:{
        type: String , 
        required: true,
        unique:true
    },
    dob:{
        type: Date
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    },
    isVerified:{
        type: Boolean,
        default:false,
    },
    verificationToken: String,

    profileImage:{ 
        type: String
    },
    
    coverPhoto:{
      type: String
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    posts:[
        { 
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Post'
        }
    ],

    followingIds:[
       {
         type: String
       }
    ]

},{
    timestamps: true
})

const User = mongoose.models.User|| mongoose.model('User',userSchema);

export default User