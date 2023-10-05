import React, { useState } from "react";
import Avatar from "../Avatar";
import { useSession } from "next-auth/react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineEdit,
} from "react-icons/ai";
import { useEffect } from "react";
import PostForm from "./PostForm";
const PostItem = ({ post , updatedPosts}) => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [edit, setEdit] = useState(false);
  const postId = post._id;
  useEffect(() => {
    fetchData();
    console.log("useEffect likes ran");
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`api/likes/${postId}`);
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

  console.log("post likes", post.likeIds.length);

  const LikeIcons = hasLiked ? AiFillHeart : AiOutlineHeart;
  console.log("rendered");
  const userLiked = async () => {
    const res = await fetch("api/likes", {
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

  const onEdit = async (e) => {
    setEdit(!edit);
  };

  const handleEditFormClick = async (e) => {
    e.stopPropagation();
  };
  return (
    <div className="post-container">
      <Avatar />
      <div>
        <div className="user-profile">
          <p className="name">{session?.user?.name}</p>
          <span className="at-name">@{session?.user?.name}</span>
          <span className="time">{post.createdAt}</span>
        </div>
      </div>

      <div className="text">{post.text}</div>

      <div className="icons">
        <div className="comment">
          <AiOutlineMessage size={20} />
          <p>0</p>
        </div>

        <div className="like" onClick={userLiked}>
          <LikeIcons size={20} color={hasLiked ? "deeppink" : ""} />
          <p>{likes}</p>
        </div>

        <div className="edit" onClick={onEdit}>
          <AiOutlineEdit size={20} />
        </div>
      </div>

      {edit ? (
        <div className="post-container" onClick={handleEditFormClick}>
          <PostForm
            placeholder={"Edit Your Post"}
            postText={post?.text}
            label={"Save"}
            type={'edit'}
            contetType={'post'}
            postId={postId}
            updatedPosts={updatedPosts}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PostItem;
