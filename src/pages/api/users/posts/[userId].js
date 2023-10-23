import { dbConnect } from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import User from "@/models/users";
import Post from "@/models/posts";

export default async function handler(req,res){
    if(req.method==='GET'){
        await dbConnect();
        const {userId} = req.query;
       
  
        const posts = await Post.find({contentType:'post',userId:userId})
          .sort({ createdAt: -1 })
          .populate({
            path: 'userId',
            model: 'User'
          })
          .populate({
            path: "commentIds",
            model: "Post",
            options: { sort: { createdAt: -1 } },
            populate: [
                {
                  path: 'userId',
                  model: 'User'
                },
                {
                  path: 'commentIds',
                  model: 'Post',
                  options: { sort: { createdAt: -1 } },
                  populate: [
                    {
                      path: 'userId',
                      model: 'User'
                    }
                    // Add more population as needed for deeper nesting
                  ]
                }
              ]
          })

          return res.status(200).json({posts})
    }
}