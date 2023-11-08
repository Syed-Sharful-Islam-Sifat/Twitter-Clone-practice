import React, { useEffect } from 'react'
import Avatar from './Avatar'
import { useState } from 'react'
import Button from './button/Button'
import { useSession } from 'next-auth/react'
import { AiFillFileImage } from 'react-icons/ai'
import PostImage from './posts/PostImage'
import { Toaster , toast} from 'react-hot-toast'
const Form = ({placeholder,updatedPosts}) => {

    const [user,setUser] = useState();

    const [tweetFile,setTweetFile] = useState(null);
    
    const {data:session} = useSession();
    const [postData,setPostData] = useState({
      name:session.user.name,
      text:'',
      contentType:'post',
      image: ''
    })

    useEffect(()=>{

    },[postData])
    
    useEffect(()=>{

    },[postData])
  
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
           const updatedData =  {
             data: imageFiles
           }
           
          

        

           const response = await fetch('api/posts',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },

            body: JSON.stringify({
              ...postData,
              image: imageFiles.tweetPhoto
            })
           })

           const data = await response.json();
           updatedPosts(data);
           toast.success('Posted');
           
           setTweetFile(null);
           setPostData({
            ...postData,
            text: '',
            image:''
           })
           
         }

      }catch(error){
        
      }
  };

  useEffect(()=>{
 
  },[tweetFile])

  const onCancel = (event)=>{
    setTweetFile(null);
   
  }

  const handleTweetFile = (event)=>{

    console.log( 'on form',event)
    if(event.target.files){
     const file = event.target.files[0];
     console.log('file----->',file)
     setTweetFile(file);
     
    }

    event.target.value=''
  }
    const textChange = ((e)=>{
       setPostData({
        ...postData,
        text: e.target.value
       })
    })

    useEffect(()=>{
    fetchUser();
    },[])
  

  const fetchUser = async()=>{
   const res = await fetch(`/api/users/${session.id}`);
   const data = await res.json();
   setUser(data);
  }
  
  return (
    <>
     <div><Toaster/></div> 
    <div className='Form-Container'>
       <div className='Form-Elements'>
         
         <div className='avatar'>
            <Avatar user={user} isLarge={false} profilePhoto={user?.profileImage}/>
         </div>

         <div className='Form-text'>
            <textarea className='text' placeholder={placeholder} onChange={textChange} value={postData.text}>
            
            </textarea>

            <hr className='hr'/>
            <div className='tweet-image-upload'>
              <PostImage handleTweetFile={handleTweetFile} tweetFile={tweetFile} onCancel={onCancel}/>
            </div>

            <div className='post-button'>
              <Button label="Post" onClick={onSubmit} body={postData.text}/>
            </div>

    
         </div>
       </div>
    </div>
    </>
  )
}

export default Form