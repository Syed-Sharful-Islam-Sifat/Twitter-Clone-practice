import React from 'react'
import Post from '@/models/posts';
import { dbConnect } from '@/config/db';
export default async function handler(req,res){
    
   try{
    dbConnect();
     if(req.method==='POST'){
        
        const {id,postId} = req.body;
        console.log('ids-->',id,postId);

        const post = await Post.findById(postId);

        if(post.likeIds.includes(id)){
            post.likeIds.pull(id);
        }else{
            post.likeIds.push(id);
        }
        await post.save();
        return res.status(200).json(post.likeIds.length)
     }

   }catch(error){
    return res.status(400).end()
   }


}