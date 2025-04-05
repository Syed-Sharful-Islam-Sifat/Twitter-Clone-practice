import React, { useState, useEffect } from "react";
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
import PostForm from "./post-form/PostForm";
import { likeACtions, deletePostACtions, getLikeDataActions } from "@/libs/actions/postsAction";
import { toast } from "react-hot-toast";
import styles from "./PostFeed.module.css";

const PostFeed = ({ posts = [], onPostCreated }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [localPosts, setLocalPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts", {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const freshPosts = await response.json();
      // Sort posts by createdAt in descending order (newest first)
      const sortedPosts = freshPosts.allPosts.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setLocalPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
    }
  };

  const handlePostSubmit = async (postData) => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const newPost = await response.json();
      
      // Fetch fresh posts to ensure we have the latest data
      await fetchPosts();
      
      if (onPostCreated) {
        onPostCreated(newPost);
      }

      toast.success("Post created successfully");
      return newPost;
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
      throw error;
    }
  };

  const handleEditSubmit = async (postData) => {
    try {
      const response = await fetch(`/api/posts/${editingPost._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      const updatedPost = await response.json();
      
      // Fetch fresh posts to ensure we have the latest data
      await fetchPosts();
      
      setEditingPost(null);
      toast.success("Post updated successfully");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // Fetch fresh posts to ensure we have the latest data
      await fetchPosts();
      
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to like post");
      }

      const updatedPost = await response.json();
      setLocalPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post");
    }
  };

  return (
    <div className={styles.postFeed}>
      {session && (
        <div className={styles.postFormWrapper}>
          <PostForm 
            onSubmit={handlePostSubmit} 
            onPostCreated={fetchPosts}
          />
        </div>
      )}

      {editingPost && (
        <div className={styles.editFormWrapper}>
          <PostForm
            initialText={editingPost.text}
            initialImage={editingPost.image}
            onSubmit={handleEditSubmit}
            placeholder="Edit your post..."
            onPostCreated={fetchPosts}
          />
        </div>
      )}

      {replyingTo && (
        <div className={styles.replyFormWrapper}>
          <PostForm
            onSubmit={handlePostSubmit}
            isReply={true}
            replyTo={replyingTo._id}
            placeholder={`Reply to ${replyingTo.user.name}...`}
            onPostCreated={fetchPosts}
          />
        </div>
      )}

      <div className={styles.postsList}>
        {localPosts.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            onEdit={() => setEditingPost(post)}
            onDelete={() => handleDelete(post._id)}
            onLike={() => handleLike(post._id)}
            onReply={() => setReplyingTo(post)}
          />
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
