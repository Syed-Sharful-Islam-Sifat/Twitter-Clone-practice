import React from 'react';
import { IoClose } from "react-icons/io5";
import styles from './PostImage.module.css';

const PostImage = ({ imagePreview, onRemove }) => {
  if (!imagePreview) return null;

  return (
    <div className={styles.imagePreviewContainer}>
      <img 
        src={imagePreview} 
        alt="Preview" 
        className={styles.imagePreview} 
      />
      <button 
        onClick={onRemove} 
        className={styles.removeImageButton}
        aria-label="Remove image"
      >
        <IoClose size={20} />
      </button>
    </div>
  );
};

export default PostImage;
