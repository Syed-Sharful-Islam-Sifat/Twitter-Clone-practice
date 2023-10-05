import React from 'react'
import Avatar from './Avatar'
import { useState } from 'react'
import Button from './Button'
import { toast } from 'react-toast'
const Form = ({placeholder,updatedPosts}) => {

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
         
         <div>
            <Avatar/>
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