import React, { useState } from 'react';
import Modal from '../auth/Modal';
import styles from '@/components/users/editmodal.module.css';

const PostImage = ({user , handlePostImage}) => {

         const [tweetFile,setTweetFile] = useState();
  const onSubmit = async (e) => {
     /// handle profile photo
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
            <input type="file" accept="image/*" onChange={({target})=>{
                 if(target.files){
                    const file = target.files[0];
                    setTweetFile(file)
                 }
            }} />
          </label>
        </div>
      </form>
    </div>
  );
};

export default PostImage;
