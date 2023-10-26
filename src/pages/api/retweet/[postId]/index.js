import Post from "@/models/posts";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import getPost from "@/libs/services/getPostServices";
export default async function handler(req,res){
    try{
       if(req.method==='PUT'){

         const session = await getServerSession(req,res,authOptions);
         const {postId} = req.query;
         const post = await getPost(postId)

         if(!post.retweetIds.includes(session.id)){
            await post.retweetIds.push(session.id);
         }else{
            throw new Error('User already retweeted this post')
         }

         await post.save();
         console.log(post)
         return res.status(200).json(post)
       }
    }catch(error){
      return res.status(400).end();
    }
}