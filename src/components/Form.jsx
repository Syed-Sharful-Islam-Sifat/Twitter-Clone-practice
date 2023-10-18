import React, { useEffect } from 'react'
import Avatar from './Avatar'
import { useState } from 'react'
import Button from './Button'
import { toast } from 'react-toast'
import { useSession } from 'next-auth/react'
const Form = ({placeholder,updatedPosts}) => {

    const [user,setUser] = useState();

    const [postData,setPostData] = useState({
      text:'',
      contentType:'post'
    })

    const textChange = ((e)=>{
       setPostData({
        ...postData,
        text: e.target.value
       })
    })

    useEffect(()=>{
    fetchUser();
    },[])
  
    const {data:session} = useSession();

  const fetchUser = async()=>{
   const res = await fetch(`/api/users/${session.id}`);
   const data = await res.json();
   setUser(data);
  }
  const onSubmit = async()=>{
    try{

      const res = await fetch('api/posts',{
       method: "POST",
       headers:{
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(postData)
      })
     const data = await res.json();
     console.log('data--->',data);
     toast.success('Posted');
     updatedPosts(data);
     
     setPostData({
      ...postData,
      text: ''
     })
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className='Form-Container'>
       <div className='Form-Elements'>
         
         <div className='avatar'>
            <Avatar user={user} isLarge={false} profilePhoto={user?.profileImage}/>
         </div>

         <div className='Form-text'>
            <textarea className='text' placeholder={placeholder} onChange={textChange} value={postData.text}>
            
            </textarea>

            <hr className='hr'/>
            <div className='post-button'>
              <Button label="Post" onClick={onSubmit} body={postData.text}/>
            </div>
         </div>
       </div>
    </div>
  )
}

export default Form