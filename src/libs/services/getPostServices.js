import { dbConnect } from "@/config/db";
import { commentIncludeRepo, createPostRepo, findPostRepo, newPostRepo } from "../repositories/postRepositories";
import { getUserService } from "./userServices";
import Post from "@/models/posts";
export  async function createPostService(id,parentId, name ,contentType, text , image ,retweetId){
    dbConnect();
    const post = await createPostRepo(id,parentId, name ,contentType, text , image ,retweetId);

    let mainPostId;
      if (contentType !== "post") {
        let parentPost = await findPostServices(parentId);
        
        parentPost = await commentIncludeService(parentPost,post);

        if (contentType === "reply") {
          let mainPost = await findPostServices(parentPost.parentId);
          await mainPost.commentIds.push(post._id);
          await mainPost.save();
          mainPostId = mainPost._id;
        }
      }
      const user = await getUserService(id);

      await user?.posts?.push(post?._id);
      await user.save();

      const newPost = await newPostRepo(post._id);
    
      return {
         newPost,
         mainPostId
      }
    
}
export async function findPostServices(id){
    const post = await findPostRepo(id);
    return post;
}

export async function commentIncludeService(parentPost,post){
    parentPost = await commentIncludeRepo(parentPost,post);
   return parentPost;
}
export async function updateLikeService(updatedPost,id){ 
   
    let hasLiked=0;
    dbConnect();
    if(updatedPost.likeIds.includes(id)){
           updatedPost.likeIds.pull(id);
            hasLiked = 0;
    }else{
            updatedPost.likeIds.push(id);
            hasLiked = 1;
    }
    await updatedPost.save();
   return{
    updatedPost
     ,hasLiked
   }
}

export async function getLikeService(id,post){
   return post.likeIds.includes(id);
}


