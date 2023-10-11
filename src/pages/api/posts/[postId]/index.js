import { dbConnect } from "@/config/db";
import Post from "@/models/posts";
export default async function handler(req,res){
  
    try{
        if(req.method==='PATCH'){
          dbConnect();
          const {postId} = req.query;
          const postData = req.body;

          console.log(postData)
          const post = await Post.findById(postId);
          post.text = postData;
          await post.save();

          return res.status(200).json(post);
        }

        if(req.method==='DELETE'){
          await dbConnect();
          const {postId} = req.query;
          const deletePost = await Post.findById(postId);
          
           if(deletePost.contentType==='reply'){
            const comment = await Post.findById(deletePost.parentId);
            await comment.commentIds.pull(postId);
            await comment.save();
            const post = await Post.findById(comment.parentId);
            post.commentIds.pull(comment._id);
            await post.save();
           }

           else if(deletePost.contentType==='comment'){
             
            const replies = await Post.find({parentId:deletePost._id});
           
            const post = await Post.findById(deletePost.parentId)
            console.log('commentIds---->',post.commentIds)
            console.log('likeIds--->',post.likeIds)
           // const result = await post.commentIds.pull(deletePost._id);

            //console.log(result)
            for(const reply of replies){
              
              post.commentIds.pull(reply._id);
              await Post.findByIdAndDelete(reply._id);
              await post.save();
              
              console.log('reply',reply);
              console.log('comments',post.commentIds.length);
              
            }

            await post.commentIds.pull(deletePost._id);
            await post.save();
            
           }

           else{
              const comments = await Post.find({parentId:deletePost._id});

              for(const comment of comments){
                  
                const replies = Post.find({parentId:comment._id});

                for(const reply of replies){
                   
                  await Post.findByIdAndDelete(reply._id);

                }

                await Post.findByIdAndDelete(comment._id);
              }
           }

        const deletedPost =   await Post.findByIdAndDelete(deletePost._id);
          console.log(deletedPost)
          return res.status(200).json(deletedPost)
        }

        if(req.method==='GET'){
          const postId = req.query.postId;
          console.log('post',postId)
          dbConnect();

          const comments = await Post.find({parentId:postId});
          const commentsWithReplies = []
          for(const comment of comments){
            const replies = await Post.find({parentId:comment._id}).sort({createdAt:-1})
            comment.replies = replies;
            commentsWithReplies.push(comment);
          }
          return res.status(200).json(commentsWithReplies );
          
        }

        if(req.method==='POST'){
          dbConnect();
        }
    }catch(error){
       return res.status(400).end();
    }
}