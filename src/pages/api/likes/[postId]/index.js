import React from "react";
import Post from "@/models/posts";
import { dbConnect } from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { findPostServices, getLikeService, updateLikeService } from "@/libs/services/getPostServices";
export default async function handler(req,res){
    try{
        
        const session = await getServerSession(req,res,authOptions);
       
        const {id} = session;
 
        dbConnect();
       const {postId} = req.query;
       let hasLiked = 0;
      
       if(typeof postId!=='string')throw new Error('No Post found');
        if(req.method==='GET'){
          const post = await findPostServices(postId);
          hasLiked = await getLikeService(id,post)
          return res.status(200).json({likesCount:post.likeIds.length,hasLiked});
        }
    }catch(error){
        console.log('postid',error)
        return res.status(400).end();
    }
}