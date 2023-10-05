import React from "react";
import Post from "@/models/posts";
import { dbConnect } from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
export default async function handler(req,res){
    try{
        
        const session = await getServerSession(req,res,authOptions);
        console.log(session)
        const {id} = session;
 
        dbConnect();
       const {postId} = req.query;
       let hasLiked = 0;
       console.log(postId)
       if(typeof postId!=='string')throw new Error('No Post found');
        if(req.method==='GET'){
          const post = await Post.findById(postId);
          console.log('id postId',id,postId)
          if(post.likeIds.includes(id)){
              hasLiked = 1;
          }
          return res.status(200).json({likesCount:post.likeIds.length,hasLiked});
        }
    }catch(error){
        console.log('postid',error)
        return res.status(400).end();
    }
}