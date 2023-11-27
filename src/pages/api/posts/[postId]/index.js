import { dbConnect } from "@/config/db";
import {
  deletePostServices,
  deleteReplyServices,
  findPostServices,
  getUpdatedPostServices,
  pullCommentServices,
  updatePostServices,
} from "@/libs/services/getPostServices";
import Post from "@/models/posts";
export default async function handler(req, res) {
  try {
    if (req.method === "PUT") {
      dbConnect();
      const { postId } = req.query;
      const { text, image } = req.body;
      let post = await findPostServices(postId);
      post = updatePostServices(post, text, image);
      const updatedPost = await getUpdatedPostServices(postId);
      return res.status(200).json(updatedPost);
    }

    if (req.method === "DELETE") {
      const { postId } = req.query;
      const deletePost = await findPostServices(postId);
      console.log('deletePost',deletePost);
      let mainPostId;
      if (deletePost.contentType === "reply") {
        let comment = await findPostServices(deletePost.parentId);
        comment = await pullCommentServices(comment, deletePost._id);
        let post = await findPostServices(comment.parentId);
        post = await pullCommentServices(post, deletePost._id);
        mainPostId = post._id;
      } else if (deletePost.contentType === "comment") {
        const replies = await deleteReplyServices(deletePost._id);
        let post = await findPostServices(deletePost.parentId);

        // const result = await post.commentIds.pull(deletePost._id);

        //console.log(result)
        for (const reply of replies) {
          post = await pullCommentServices(post, reply._id);
          await deletePostServices(reply._id);
        }

        post = pullCommentServices(post, deletePost._id); //await post.commentIds.pull(deletePost._id);
      } else {
        const comments = await deleteReplyServices(deletePost._id);
        for (const comment of comments) {
          const replies = await deleteReplyServices(comment._id); // Post.find({ parentId: comment._id });
          for (const reply of replies) {
            await deletePostServices(reply._id); //Post.findByIdAndDelete(reply._id);
          }

          await deletePostServices(comment._id);
        }
      }
      const deletedPost = await deletePostServices(deletePost._id); //await Post.findByIdAndDelete(deletePost._id);
      console.log('deletedPost and mainPostId',deletedPost,mainPostId)
      return res.status(200).json({ deletedPost, mainPostId });
    }

    if (req.method === "GET") {
      const { postId } = req.query;
      const post = await findPostServices(postId);
      return res.status(200).json(post);
    }

    if (req.method === "POST") {
      dbConnect();
    }
  } catch (error) {
    return res.status(400).end();
  }
}
