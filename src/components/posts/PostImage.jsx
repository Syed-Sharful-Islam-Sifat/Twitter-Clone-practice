import React, { useEffect, useState } from 'react';
import Modal from '../auth/Modal';
import styles from '@/components/posts/postimage.module.css'
const PostImage = ({user , handlePostImage , handleTweetFile,tweetFile , onCancel}) => {


  const onSubmit = async (e) => {
    
      e.preventDefault();

      try{
         const formData = new FormData();

         if(tweetFile){
            formData.append('tweet_photo',tweetFile);
         }
         
         const res = await fetch('http://localhost:3000/api/upload',{
            method: 'POST',
            body: formData
         })

         
         
         
         if(res.ok){
           const imageFiles = await res.json();
           console.log('res.ok',res.status)
           const updatedData =  {
             data: imageFiles
           }
           
           console.log('updatedData',updatedData);

           const response = await fetch(`http://localhost:3000/api/posts/${postId}`,{
            method: 'PUT',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify(updatedData)
           });

           const data = await response.json();
           console.log(data)
           handleCoverChange(data);
           handleProfileChange(data);
         }

      }catch(error){
        
      }
  };

  return (
    <div className={styles.profile_container}>
      
      <form onSubmit={onSubmit}>
        <div className={styles.file_input}>
          <label>
            {
              tweetFile?
              tweetFile.name:'Upload an Image'
             }
            <input type="file" accept="image/*" onChange={(event)=>handleTweetFile(event)} />
          </label>
          {tweetFile?(<button className={styles.cancel_button} onClick={onCancel}>Cancel</button>):null}
        </div>
      </form>
    </div>
  );
};

export default PostImage;
