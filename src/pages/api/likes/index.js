import React from 'react'
import Post from '@/models/posts';
import { dbConnect } from '@/config/db';
export default async function handler(req,res){
    
   try{
    dbConnect();
     if(req.method==='PATCH'){
        
        const {id,postId} = req.body;
        console.log('ids-->',id,postId);

        let hasLiked = 0;

        const post = await Post.findById(postId);
       console.log('likeIds',post.likeIds);
        if(post.likeIds.includes(id)){
            post.likeIds.pull(id);
            hasLiked = 0;
        }else{
            post.likeIds.push(id);
            hasLiked = 1;
        }
        await post.save();
        return res.status(200).json({likesCount: post.likeIds.length,hasLiked:hasLiked})
     }
   }catch(error){
    return res.status(400).end()
   }


}