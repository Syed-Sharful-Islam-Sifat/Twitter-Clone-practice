import React, { useState } from "react";
import Avatar from "../Avatar";
import Button from "../Button";
const PostForm = ({ placeholder, postText , label , contentType, type,postId,updatedPosts}) => {
  const [postData, setPostData] = useState(postText);

  const textChange = (e) => {
    setPostData(e.target.value);
  };

  const onSubmit = async()=>{

    console.log(type,postId,postData)

    if(type==='edit'){
        const res = await fetch(`api/posts/${postId}`,{
          method:'PATCH',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(postData)
        })

        const data = await res.json();

        console.log('response',data);
    }

  }

  return (
    <>
      <div className="Form-Container">
        <div className="Form-Elements">
          <div>
            <Avatar />
          </div>

          <div className="Form-text">
            <textarea
              className="text"
              placeholder={placeholder}
              onChange={textChange}
              value={postData}
            ></textarea>

            <hr className="hr" />
            <div className="post-button">
              <Button label={label} onClick={onSubmit} body={postData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostForm;
