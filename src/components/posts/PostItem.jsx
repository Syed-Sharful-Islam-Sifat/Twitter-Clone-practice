import React, { useState, useEffect } from "react";
import Avatar from "../Avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AiOutlineRetweet, AiOutlineShareAlt } from "react-icons/ai";
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
import { IoEllipsisHorizontal } from "react-icons/io5";
import PostForm from "./post-form/PostForm";
import styles from "./PostItem.module.css";
import { toast } from "react-hot-toast";

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
 
  const [retweetCount, setRetweetCount] = useState(post.retweets?.length || 0);
  const [showMenu, setShowMenu] = useState(false);
  
  const isOwnPost = session?.user?.id === post.userId;

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

  const handleRetweet = async (e) => {
    e.stopPropagation();
    if (!session) {
      toast.error("Please sign in to retweet posts");
      return;
    }
    setIsRetweeted(!isRetweeted);
    setRetweetCount(prev => isRetweeted ? prev - 1 : prev + 1);
  };

  const { id } = session.user;

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

    return format(new Date(post.createdAt), "MMM d, yyyy");
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

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!session) {
      toast.error("Please sign in to like posts");
      return;
    }
    userLiked(e);
  };

  const handleReply = (e) => {
    e.stopPropagation();
    if (!session) {
      toast.error("Please sign in to reply to posts");
      return;
    }
    handlePostReply(e);
  };

  return (
    <article className={styles.postItem}>
      <div className={styles.postHeader}>
        <div className={styles.userInfo}>
          {ownProfile && post.retweetId ? (
            <div className="repost-p">
              <p>You reposted</p>
            </div>
          ) : post.retweetId ? (
            <div className="repost-p">
              <p>{post.name} reposted this</p>
            </div>
          ) : null}

          <div className={styles.userDetails}>
            <Avatar
              user={post?.retweetId?post?.retweetId:post.userId}
              isLarge={false}
              profilePhoto={
                post.retweetId
                  ? post.retweetId.profileImage
                  : post?.userId?.profileImage
              }
            />
            <div className={styles.userDetails}>
              <span className={styles.userName}>
                { post.retweetId
                  ? post?.retweetId.name
                  : post.name}
              </span>
              <span className={styles.userHandle}>
                @{post.retweetId ? post?.retweetId.name : post.name}
              </span>
              <span className={styles.postDate}>· {createdAt()}</span>
            </div>
          </div>
        </div>

        <div className={styles.postMenu}>
          <button 
            className={styles.menuButton}
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <IoEllipsisHorizontal size={20} />
          </button>
          {showMenu && (
            <div className={styles.menu}>
              {isOwnPost ? (
                <>
                  <button onClick={onEdit}>Edit post</button>
                  <button onClick={onDelete}>Delete post</button>
                </>
              ) : (
                <button>Report post</button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.postContent}>
        <p className={styles.postText}>{post?.text}</p>

        {post?.image && (
          <div className={styles.postImage}>
            <img
              src={post.image}
              alt="Post image"
              className={styles.image}
            />
          </div>
        )}
      </div>

      <div className={styles.postActions}>
        {post?.contentType !== "reply" ? (
          <button 
            className={styles.actionButton}
            onClick={handleReply}
            title="Reply"
          >
            <AiOutlineMessage size={20} />
            <span>{post?.commentIds?.length || 0}</span>
          </button>
        ) : null}

        <button 
          className={`${styles.actionButton} ${isRetweeted ? styles.retweeted : ''}`}
          onClick={handleRetweet}
          title="Retweet"
        >
          <AiOutlineRetweet size={20} />
          <span>{retweetCount}</span>
        </button>

        <button 
          className={`${styles.actionButton} ${hasLiked ? styles.liked : ''}`}
          onClick={handleLike}
          title="Like"
        >
          {hasLiked ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
          <span>{likes}</span>
        </button>

        <button 
          className={styles.actionButton}
          title="Share"
        >
          <AiOutlineShareAlt size={20} />
        </button>
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
    </article>
  );
};

export default PostItem;
