import React from 'react'
import Avatar from './Avatar'
import { useState } from 'react'
import Button from './Button'
const Form = ({placeholder}) => {

    const [body,setBody] = useState(null);
  const onSubmit = async()=>{

  }
  return (
    <div className='Form-Container'>
       <div className='Form-Elements'>
         
         <div>
            <Avatar/>
         </div>

         <div className='Form-text'>
            <textarea className='text' placeholder={placeholder} onChange={(e)=>setBody(e.target.value)}>
            
            </textarea>

            <hr className='hr'/>
            <div className='post-button'>
              <Button label="Post" onClick={onSubmit} body={body}/>
            </div>
         </div>
       </div>
    </div>
  )
}

export default Form