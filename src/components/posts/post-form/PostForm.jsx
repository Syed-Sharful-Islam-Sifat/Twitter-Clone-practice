import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Avatar from "@/components/Avatar";
import PostImage from "@/components/posts/postimage";
import { AiOutlinePicture, AiOutlineGif, AiOutlineSmile, AiOutlineSchedule } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";
import styles from "./PostForm.module.css";

const PostForm = ({ 
  placeholder = "What's happening?", 
  onSubmit,
  initialText = "",
  initialImage = null,
  isReply = false,
  replyTo = null,
  onPostCreated,
  isSubmitting = false
}) => {
  const { data: session } = useSession();
  const [text, setText] = useState(initialText);
  const [imageBase64, setImageBase64] = useState(initialImage);
  const [localSubmitting, setLocalSubmitting] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Create base64 preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageBase64(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetForm = () => {
    setText('');
    setImageBase64(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim() && !imageBase64) {
      toast.error("Please add some text or an image to your post");
      return;
    }
    
    // Use the parent's isSubmitting state if provided, otherwise use local state
    if (isSubmitting !== undefined) {
      if (isSubmitting) return; // Don't submit if already submitting
    } else {
      setLocalSubmitting(true);
    }
    
    // Store the current form data
    const currentText = text;
    const currentImage = imageBase64;
    
    try {
      // Create post data object
      const postData = {
        text: currentText,
        contentType: isReply ? "reply" : "post",
        userId: session?.user?.id,
        image: currentImage, // Send base64 image directly
      };
      
      if (isReply && replyTo) {
        postData.replyTo = replyTo;
      }
      
      // Call the provided onSubmit handler
      if (onSubmit) {
        try {
          const newPost = await onSubmit(postData);
          
          // Reset the form only after successful submission
          resetForm();
          
          // Call onPostCreated callback if provided
          if (onPostCreated) {
            // Call this in the background
            onPostCreated().catch(err => console.error("Error refreshing posts:", err));
          }
          
          return newPost;
        } catch (error) {
          console.error('Error in onSubmit handler:', error);
          toast.error('Failed to create post. Please try again.');
        }
      } else {
        // Default submission if no handler provided
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

        // Don't try to parse the response as JSON if it's empty
        let data;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        }
        
        // Reset the form only after successful submission
        resetForm();
        
        // Call onPostCreated callback if provided
        if (onPostCreated) {
          // Call this in the background
          onPostCreated().catch(err => console.error("Error refreshing posts:", err));
        }
        
        toast.success(isReply ? 'Reply posted successfully' : 'Post created successfully');
        
        return data;
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    } finally {
      // Only reset local submitting state if we're not using the parent's state
      if (isSubmitting === undefined) {
        setLocalSubmitting(false);
      }
    }
  };

  // Determine if the form is currently submitting
  const isCurrentlySubmitting = isSubmitting !== undefined ? isSubmitting : localSubmitting;

  return (
    <>
      <Toaster position="bottom-center" />
      <div className={styles.postFormContainer}>
        <div className={styles.postFormContent}>
          <div className={styles.avatarContainer}>
            <Avatar
              user={session?.user}
              isLarge={false}
              profilePhoto={session?.user?.image}
            />
          </div>

          <div className={styles.formContent}>
            <textarea
              ref={textareaRef}
              className={styles.postInput}
              placeholder={placeholder}
              value={text}
              onChange={handleTextChange}
              rows={1}
              disabled={isCurrentlySubmitting}
            />

            {imageBase64 && (
              <div className={styles.imagePreviewWrapper}>
                <PostImage 
                  imagePreview={imageBase64} 
                  onRemove={removeImage} 
                />
              </div>
            )}

            <div className={styles.postActions}>
              <div className={styles.mediaActions}>
                <label className={styles.mediaButton} title="Add image">
                  <AiOutlinePicture />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.fileInput}
                    disabled={isCurrentlySubmitting}
                  />
                </label>
                <button className={styles.mediaButton} title="Add GIF" disabled={isCurrentlySubmitting}>
                  <AiOutlineGif />
                </button>
                <button className={styles.mediaButton} title="Add emoji" disabled={isCurrentlySubmitting}>
                  <AiOutlineSmile />
                </button>
                <button className={styles.mediaButton} title="Schedule post" disabled={isCurrentlySubmitting}>
                  <AiOutlineSchedule />
                </button>
              
              </div>

              <button
                className={`${styles.postButton} ${(!text.trim() && !imageBase64) ? styles.disabled : ''}`}
                onClick={handleFormSubmit}
                disabled={(!text.trim() && !imageBase64) || isCurrentlySubmitting}
              >
                {isCurrentlySubmitting ? 'Posting...' : isReply ? 'Reply' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostForm; 