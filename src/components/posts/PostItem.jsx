import React, { useState } from "react";
import Avatar from "../Avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AiOutlineRetweet } from "react-icons/ai";
import Image from "next/image";
import { retweet } from "@/libs/actions/retweetActions";
import format from "date-fns/format";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { useEffect } from "react";
import PostForm from "./PostForm";
const PostItem = ({
  post,
  handleEdit,
  updatedPosts,
  handleDelete,
  type,
  isRetweeted,
  ownProfile,
}) => {
  const router = useRouter();
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState(false);
  const [reply, setReply] = useState(false);
  const [commentReply, setCommentReply] = useState(false);
  const [count, setCount] = useState(0);
  const [postComments, setPostComments] = useState([]);
  const [user, setUser] = useState();
  const postId = post?._id;
  const { data: session } = useSession();
  if (post.retweetId) {
 
  }
  useEffect(() => {
    fetchData();
  
    verifyPost();
    fetchUser();
  }, []);

  const verifyPost = () => {
    post?.comments?.map((comment) => {
    
    });
  };

 

  const fetchUser = async () => {
    const res = await fetch(`/api/users/${session.id}`);
    const data = await res.json();
    setUser(data);
  };
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

  const handleRetweet = async () => {
    const data = await retweet(postId, session.user.name);
  };



  const { id } = session;

  const LikeIcons = hasLiked ? AiFillHeart : AiOutlineHeart;

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

  const createdAt = () => {
    if (!post?.createdAt) {
      return null;
    }

    return format(new Date(post.createdAt), "dd MMMM yyyy");
  };

  useEffect(() => {

  }, [reply, commentReply]);

  const handlePostComment = (e) => {
    e.stopPropagation();
    setReply(!reply);
   
  };

  const handlePostReply = (e) => {
    e.stopPropagation();
    setCommentReply(!commentReply);
  };
  const onDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
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
          {ownProfile && post.retweetId ? (
            <div className="repost-p">
              <p>You reposted</p>
            </div>
          ) : post.retweetId ? (
            <div className="repost-p">
              <p>{post.name} reposted this</p>
            </div>
          ) : null}

          <div className="avatar-bio">
            <Avatar
              user={post?.retweetId?post?.retweetId:post.userId}
              isLarge={false}
              profilePhoto={
                post.retweetId
                  ? post.retweetId.profileImage
                  : post?.userId?.profileImage
              }
            />
            <div className="user-profile">
              <p className="name">
                { post.retweetId
                  ? post?.retweetId.name
                  : post.name}
              </p>
              <span className="at-name">
                @{post.retweetId ? post?.retweetId.name : post.name}
              </span>
              <p className="time">{createdAt()}</p>
            </div>
          </div>
        </div>

        <div className="text">{post?.text}</div>

        <div className="image">
          {post?.image ? (
            <Image
              src={`/images/${post?.image}`}
              alt="tweet image"
              style={{ objectFit: "cover" , borderRadius: "10px"}}
              width={
                post.contentType === "post"
                  ? 600
                  : post.contentType === "comment"
                  ? 500
                  : 400
              }
              height={300}
            />
          ) : null}
        </div>

        <div className="icons">
          {post?.contentType !== "reply" ? (
            <div className="comment" onClick={handleComment}>
              <AiOutlineMessage size={20} className={edit ? "" : "disabled"} />
              <div
                className="commentsId"
                onClick={
                  post?.contentType === "post"
                    ? handlePostComment
                    : handlePostReply
                }
              >
                <p>{post?.commentIds?.length}</p>
              </div>
            </div>
          ) : null}

          <div className="like" onClick={userLiked}>
            <LikeIcons size={20} color={hasLiked ? "deeppink" : ""} />
            <p>{likes}</p>
          </div>

          {session.id === post.userId._id &&!post.retweetId? (
            <div className="edit" onClick={onEdit}>
              <AiOutlineEdit size={20} className={comment ? "" : "disabled"} />
            </div>
          ) : null}

          {session.id === post.userId._id ?(
            <div className="delete" onClick={onDelete}>
              <AiOutlineDelete size={20} />
            </div>
          ) : null}
          {session.id !== post.userId._id ? (
            <div className="re-tweet" onClick={handleRetweet}>
              <AiOutlineRetweet
                size={20}
                className={!ownProfile&&post.retweetId===session.id ? "retweet" : ""}
              />
            </div>
          ) : null}
        </div>

        {edit ? (
          <div className="post-container" onClick={handleEditFormClick}>
            <PostForm
              placeholder={"Edit Your Post"}
              postText={post?.text}
              label={"Save"}
              type={"edit"}
              name={post?.name}
              contetType={post?.contentType}
              postId={postId}
              makeEditFalse={makeEditFalse}
              makeReplyFalse={makeReplyFalse}
              handleEdit={handleEdit}
              updatedPosts={updatedPosts}
              imageFile={post?.image}
            />
          </div>
        ) : null}

        {comment ? (
          <div className="post-container" onClick={handleEditFormClick}>
            <PostForm
              placeholder={`Reply to @${post?.name}`}
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
          console.log("reply", post, comment.userId);
          return (
            <div key={comment._id}>
              {comment.contentType === "comment" ? (
                <PostItem
                  post={comment}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  updatedPosts={updatedPosts}
                  type={"posts-comments"}
                />
              ) : null}

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
