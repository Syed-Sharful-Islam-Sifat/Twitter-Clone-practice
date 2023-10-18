import React, { useState } from 'react';
import Modal from '../auth/Modal';
import styles from '@/components/users/editmodal.module.css';

const EditModal = ({user , handleCoverChange,handleProfileChange}) => {
  const [profilefile, setProfilefile] = useState();
  const [coverfile, setCoverfile] = useState();

  const onSubmit = async (e) => {
     /// handle profile photo
      e.preventDefault();

      try{
         const formData = new FormData();

         if(profilefile){
            formData.append('profile_photo',profilefile);
         }if(coverfile){
            formData.append('cover_photo',coverfile);
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

           const response = await fetch(`http://localhost:3000/api/users/${user._id}`,{
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
              profilefile?
              profilefile.name:'Choose Profile Photo'
             }
            <input type="file" accept="image/*" onChange={({target})=>{
                 if(target.files){
                    const file = target.files[0];
                    setProfilefile(file)
                 }
            }} />
          </label>
        </div>

        <div className={styles.file_input}>
          <label>
          {
              coverfile?
              coverfile.name:'Choose Cover Photo'
             }
            <input type="file" accept="image/*" onChange={({target})=>{
                if(target.files){
                    const file = target.files[0];
                    setCoverfile(file);
                }
            }} />
          </label>
        </div>

        <button className={styles.save_button} onClick={onSubmit}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditModal;