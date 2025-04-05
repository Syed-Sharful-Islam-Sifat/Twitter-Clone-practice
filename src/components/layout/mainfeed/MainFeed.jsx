import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import PostForm from '../../posts/post-form/PostForm';
import PostItem from '../../posts/PostItem';
import { toast } from 'react-hot-toast';
import styles from './MainFeed.module.css';

const MainFeed = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const data = await response.json();
      
      // Sort posts by createdAt in descending order (newest first)
      const sortedPosts = data.allPosts.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setPosts(sortedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
      setLoading(false);
    }
  };

  const handlePostSubmit = async (postData) => {
    setIsSubmitting(true);
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

      const { newPost } = await response.json();
      
      // Immediately add the new post to the UI
      setPosts(prevPosts => [newPost, ...prevPosts]);
      
      // Then fetch fresh posts in the background
      fetchPosts().catch(err => console.error("Error refreshing posts:", err));
      
      toast.success('Post created successfully');
      return newPost;
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error('Failed to create post');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (postId, updatedContent) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: updatedContent }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      
      const updatedPost = await response.json();
      
      // Optimistically update the UI
      setPosts(prevPosts => 
        prevPosts.map(post => post._id === postId ? updatedPost : post)
      );
      
      // Then fetch fresh posts in the background
      fetchPosts().catch(err => console.error("Error refreshing posts:", err));
      
      toast.success('Post updated successfully');
      return updatedPost;
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (postId) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      
      // Optimistically update the UI
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      
      // Then fetch fresh posts in the background
      fetchPosts().catch(err => console.error("Error refreshing posts:", err));
      
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.mainFeed}>
      <div className={styles.header}>
        <h2>Home</h2>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>For you</button>
          <button className={styles.tab}>Following</button>
        </div>
      </div>

      {session && (
        <div className={styles.postFormContainer}>
          <PostForm 
            onSubmit={handlePostSubmit} 
            onPostCreated={fetchPosts}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      <div className={styles.postsContainer}>
        {loading ? (
          <div className={styles.loading}>Loading posts...</div>
        ) : posts.length > 0 ? (
          posts.map(post => (
            <PostItem
              key={post._id}
              post={post}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              type="post"
              isSubmitting={isSubmitting}
            />
          ))
        ) : (
          <div className={styles.noPosts}>No posts yet. Be the first to post!</div>
        )}
      </div>
    </div>
  );
};

export default MainFeed; 