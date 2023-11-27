import { dbConnect } from "@/config/db";
import Post from "@/models/posts";

export async function createPostRepo(id,parentId, name ,contentType, text , image ,retweetId){
 dbConnect();
 const post = await Post.create({
    userId: id,
    name,
    contentType,
    text,
    image,
    parentId,
    retweetId
  });

  return post;
}

export async function findPostRepo(id){
    dbConnect();
    const post = await Post.findById(id);
    return post;
}

export async function commentIncludeRepo(parentPost,post){  
    dbConnect();
    await parentPost.commentIds.push(post._id);
    await parentPost.save();
    return parentPost;
}

export async function newPostRepo(id){
    dbConnect();
   const newPost =  await Post.findById(id)
        .sort({ createdAt: -1 })
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

        }).populate({
          path: 'retweetId',
          model: 'User',
        })

     return newPost;   
}

export async function getUpdatedPostRepo(id){
  dbConnect();  
  const updatedPost = await Post.findById(id)
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

  return updatedPost;
}

export async function deleteReplyRepo(id){
  const replies = await Post.find({parentId:id});
  return replies;
}
export async function deletePostRepo(id){
  const deletedPost = await Post.findByIdAndDelete(id);
  return deletedPost;
}