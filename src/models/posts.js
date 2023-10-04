import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
    },
    contentType:{
        type: String ,
        enum:['post','comment','reply'],
        required: true
    },
    text:{
        type: String,
    },

    image:{
      type: String
    },

    likeIds:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],

    parentId:{
        type:String
    }
    ,
},{
    timestamps: true,
})

const Post = mongoose.models.Post || mongoose.model('Post',postSchema);

export default Post;
