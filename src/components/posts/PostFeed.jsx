import React, { useState } from "react";
import Avatar from "../Avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PostItem from "./PostItem";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { useEffect } from "react";
import PostForm from "./PostForm";
import {likeACtions, deletePostACtions, getLikeDataActions } from "@/libs/actions/postsAction";
const PostFeed = ({ post, handleEdit, updatedPosts, handleDelete, type }) => {
  const router = useRouter();
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState(false);
  const [reply, setReply] = useState(false);
  const [commentReply, setCommentReply] = useState(false);
  const [count, setCount] = useState(0);
  const [postComments, setPostComments] = useState([]);

  const postId = post?._id;
  useEffect(() => {
    fetchData();
   
   
  }, []);

  const verifyPost = () => {
    post?.comments?.map((comment) => {

    });
  };

  const fetchData = async () => {
    try {
      const res = await getLikeDataActions()
      const data = await res.json();

      setLikes(data.likesCount);
      setHasLiked(data.hasLiked);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: session } = useSession();



  const { id } = session;

  const LikeIcons = hasLiked ? AiFillHeart : AiOutlineHeart;

  const userLiked = async (e) => {
    e.stopPropagation();
    const res = await likeACtions(id,postId);
    const data = await res.json();
    setLikes(data?.likesCount);
    setHasLiked(data?.hasLiked);
  };

  const handleComment = (e) => {
    e.stopPropagation();
    setComment(!comment);
    setEdit(false);
  };

  const onEdit = (e) => {
    e.stopPropagation();
    setEdit(!edit);
    setComment(false);
  };

  const makeEditFalse = () => {
    setEdit(false);
  };

  const makeReplyFalse = () => {
    setComment(false);
  };

  const handleEditFormClick = async (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
 
  }, [reply, commentReply]);

  const handleReply = (e) => {
    console.log(post?.contentType);
    if (post?.contentType === "post") setReply(!reply);
    if (post?.contentType === "comment") {
      setCommentReply(!commentReply);
      setReply(true);
    }
    e.stopPropagation();
  };
  const onDelete = async () => {
    try {
      const res = await deletePostACtions()

      const data = await res.json();
      handleDelete(data);
      console.log("deleted post", data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="post-container">
      <div className={type}>
        <Avatar />
        <div>
          <div className="user-profile">
            <p className="name">{session?.user?.name}</p>
            <span className="at-name">@{session?.user?.name}</span>
            <span className="time">{post?.createdAt}</span>
          </div>
        </div>

        <div className="text">{post?.text}</div>

        <PostItem
          post={post}
          handleComment={handleComment}
          handleReply={handleReply}
          userLiked={userLiked}
          onEdit={onEdit}
          onDelete={onDelete}
          edit = {edit}
          comment = {comment}

        />

        {edit ? (
          <div className="post-container" onClick={handleEditFormClick}>
            <PostForm
              placeholder={"Edit Your Post"}
              postText={post?.text}
              label={"Save"}
              type={"edit"}
              contetType={post?.contentType}
              postId={postId}
              makeEditFalse={makeEditFalse}
              makeReplyFalse={makeReplyFalse}
              handleEdit={handleEdit}
              updatedPosts={updatedPosts}
            />
          </div>
        ) : null}

        {comment ? (
          <div className="post-container" onClick={handleEditFormClick}>
            <PostForm
              placeholder={`Reply to @${session?.user?.name}`}
              postText={""}
              label={"Reply"}
              type={"post"}
              contentType={post.contentType}
              postId={postId}
              makeEditFalse={makeEditFalse}
              makeReplyFalse={makeReplyFalse}
              handleEdit={handleEdit}
              updatedPosts={updatedPosts}
            />
          </div>
        ) : null}
      </div>
      {reply &&
        post?.comments?.map((comment) => {
          return (
            <div key={comment._id}>
              <PostItem
                post={comment}
                handleComment={handleComment}
                handleReply={handleReply}
                userLiked={userLiked}
                onEdit={onEdit}
                onDelete={onDelete}
              />
              {commentReply &&
                comment?.replies?.map((reply) => (
                  <div key={reply._id}>
                    <PostItem
                      post={reply}
                      handleComment={handleComment}
                      handleReply={handleReply}
                      userLiked={userLiked}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </div>
                ))}
            </div>
          );
        })}
    </div>
  );
};

export default PostFeed;
