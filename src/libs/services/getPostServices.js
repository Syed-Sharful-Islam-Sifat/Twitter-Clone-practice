import Post from "@/models/posts";
import { dbConnect } from "@/config/db";
export default async function getPost(req,res,postId){
    dbConnect();

   const  post = await Post.findById(postId);

    return post;
}