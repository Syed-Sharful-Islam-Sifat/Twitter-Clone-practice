import { dbConnect } from "@/config/db";
import Post from "@/models/posts";
export default async function handler(req,res){
  
    try{
        if(req.method==='PATCH'){
          const {postId} = req.query;
          const postData = req.body;

          console.log(postData)
          const post = await Post.findById(postId);
          post.text = postData;
          await post.save();

          return res.status(200).json(post);
        }
    }catch(error){
       return res.status(400).end();
    }
}