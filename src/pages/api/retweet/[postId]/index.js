import Post from "@/models/posts";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req,res){
    try{
       if(req.method==='PUT'){

         const session = await getServerSession(req,res,authOptions);
         const {postId} = req.query;
         const post = await Post.findById(postId);

         if(!post.retweetIds.includes(session.id)){
            await post.retweetIds.push(session.id);
         }else{
            throw new Error('User already retweeted this post')
         }

         await post.save();
       }
    }catch(error){
      return res.status(400).end();
    }
}