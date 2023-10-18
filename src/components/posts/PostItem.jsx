import React, { useState } from "react";
import Avatar from "../Avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { useEffect } from "react";
import PostForm from "./PostForm";
const PostItem = ({ post, handleEdit, updatedPosts, handleDelete, type }) => {
  const router = useRouter();
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState(false);
  const [reply, setReply] = useState(false);
  const[commentReply,setCommentReply] = useState(false);
  const [count, setCount] = useState(0);
  const [postComments, setPostComments] = useState([]);
  const[user,setUser] = useState();
  const postId = post?._id;
  useEffect(() => {
    fetchData();
    console.log("useEffect likes ran");
    verifyPost();
    fetchUser();

  }, []);


  const verifyPost = ()=>{
    post?.comments?.map((comment)=>{
      console.log('verify post',comment)
    })
  }

  
  const fetchUser = async ()=>{
    const res = await fetch(`/api/users/${session.id}`);
    const data = await res.json();
    setUser(data);
  }
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/likes/${postId}`);
      const data = await res.json();

      setLikes(data.likesCount);
      setHasLiked(data.hasLiked);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: session } = useSession();

  console.log(session?.user);

  const { id } = session;



  const LikeIcons = hasLiked ? AiFillHeart : AiOutlineHeart;
  console.log("rendered");
  const userLiked = async (e) => {
    e.stopPropagation();
    const res = await fetch("http://localhost:3000/api/likes", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, postId }),
    });

    const data = await res.json();
    console.log(data);
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
   
  useEffect(()=>{
    console.log('commentReply reply',commentReply,reply);
    console.log(post)
    console.log(post?.commentIds);
  },[reply,commentReply])

  const handlePostComment = (e) => {
    e.stopPropagation();
    setReply(!reply);
    console.log('on handleReply',post);
  };

  const handlePostReply = (e)=>{
    e.stopPropagation();
    setCommentReply(!commentReply);
  }
  const onDelete = async () => {
    try {
      const res = await fetch(`api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

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
        <div className="user-profile-container">
          <Avatar user={user} isLarge={false} profilePhoto={user?.profileImage}/>
          <div className="user-profile">
            <p className="name">{session?.user?.name}</p>
            <span className="at-name">@{session?.user?.name}</span>
            <span className="time">{post?.createdAt}</span>
          </div>
        </div>

        <div className="text">{post?.text}</div>

        <div className="icons">
          {post?.contentType!=='reply'?(
            <div className="comment" onClick={handleComment}>
            <AiOutlineMessage size={20} className={edit ? "" : "disabled"} />
            <div className="commentsId" onClick={post?.contentType==='post'? handlePostComment:handlePostReply}>
              <p>{post?.commentIds?.length}</p>
            </div>
          </div>
          ):null}


          <div className="like" onClick={userLiked}>
            <LikeIcons size={20} color={hasLiked ? "deeppink" : ""} />
            <p>{likes}</p>
          </div>

          <div className="edit" onClick={onEdit}>
            <AiOutlineEdit size={20} className={comment ? "" : "disabled"} />
          </div>

          <div className="delete" onClick={onDelete}>
            <AiOutlineDelete size={20} />
          </div>
        </div>

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
        post?.commentIds?.map((comment) => {
          console.log('reply',post,comment)
          return (
            <div key={comment._id}>
              {comment.contentType==='comment'?(
                
              <PostItem
                post={comment}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                updatedPosts={updatedPosts}
                type={"posts-comments"}
              />):null}
              
              {reply &&
                comment.commentIds.map((reply) => (
                  <div key={reply._id}>
                    <PostItem
                      post={reply}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      updatedPosts={updatedPosts}
                      type={"comments-reply"}
                    />
                  </div>
                ))}
            </div>
          );
        })}
    </div>
  );
};

export default PostItem;
