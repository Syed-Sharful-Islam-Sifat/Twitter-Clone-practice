import { dbConnect } from "@/config/db";
import { findPostServices } from "@/libs/services/getPostServices";
import Post from "@/models/posts";
export default async function handler(req,res){
  
    try{
        if(req.method==='PUT'){
          dbConnect();
          const {postId} = req.query;
          const {text,image} = req.body;
        
          
          const post =  await Post.findById(postId)

          post.text = text
          post.image = image;
          
          await post.save(); 
           
          const updatedPost = await Post.findById(postId)
                              .sort({createdAt:-1})
                              .populate({
                                path: 'userId',
                                model: 'User'
                              })
                              .populate({
                                path:"commentIds",
                                model:"Post",
                                options:{sort:{createdAt:-1}},
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
                                     
                                    ]
                                  }
                                ]

                              })       
          return res.status(200).json(updatedPost);
        }

        if(req.method==='DELETE'){
          await dbConnect();
          const {postId} = req.query;
          const deletePost = await Post.findById(postId);
          let mainPostId;
           if(deletePost.contentType==='reply'){
            const comment = await Post.findById(deletePost.parentId);
            await comment.commentIds.pull(deletePost._id);
            await comment.save();
            const post = await Post.findById(comment.parentId);
            post.commentIds.pull(deletePost._id);
            mainPostId = post._id;
            await post.save();
           }

           else if(deletePost.contentType==='comment'){
             
            const replies = await Post.find({parentId:deletePost._id});
           
            const post = await Post.findById(deletePost.parentId)
           
           // const result = await post.commentIds.pull(deletePost._id);

            //console.log(result)
            for(const reply of replies){
              
              post.commentIds.pull(reply._id);
              await Post.findByIdAndDelete(reply._id);
              await post.save();
            }

            await post.commentIds.pull(deletePost._id);
            await post.save();
            
           }

           else{
             
              const comments = await Post.find({parentId:deletePost._id});
              for(const comment of comments){
                  
                const replies = await Post.find({parentId:comment._id});
                for(const reply of replies){
                   
                  await Post.findByIdAndDelete(reply._id);

                }

                await Post.findByIdAndDelete(comment._id);
              }
           }
        const deletedPost =   await Post.findByIdAndDelete(deletePost._id);
       
          return res.status(200).json({deletedPost,mainPostId})
        }

        if(req.method==='GET'){
           
           const{ postId }= req.query;
           const post = await findPostServices(postId);
           return res.status(200).json(post);
        }

        if(req.method==='POST'){
          dbConnect();
        }
    }catch(error){
       return res.status(400).end();
    }
}