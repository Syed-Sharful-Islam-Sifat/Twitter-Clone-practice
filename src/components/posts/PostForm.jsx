import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import Button from "../Button";
import { useSession } from "next-auth/react";
const PostForm = ({
  placeholder,
  postText,
  label,
  contentType,
  type,
  postId,
  fetchPosts,
  makeEditFalse,
  makeReplyFalse,
  handleEdit,
  updatedPosts
}) => {
  const [text,setText] = useState(postText);
  const[user,setUser] = useState()
  const textChange = (e) => {
    setText(e.target.value);
  };

  const {data:session} = useSession();

  useEffect(()=>{
     fetchUser();
     console.log('on PostForm',user)
  },[])

  const fetchUser = async ()=>{
    const res = await fetch(`/api/users/${session.id}`);

    const data = await res.json();
    setUser(data);
    console.log('fetchUser',user)
  }

  const onSubmit = async () => {
    console.log(contentType, postId, text);

    let parentId = postId;

    console.log('replying-->',contentType,parentId,text);

    if (type === "edit") {
      const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
      });

      const data = await res.json();
      console.log('edited',data.contentType)
      
      
      console.log(data);
      makeEditFalse();
      handleEdit(data,data.contentType);
      
      
    } else {

        if(contentType==='post')contentType = 'comment'
         else
         contentType = 'reply'
      try{
        
        const res = await fetch("http://localhost:3000/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({parentId,contentType,text}),
        });
        const data = await res.json();
        console.log('reply-->',data);
        setText('')
        makeReplyFalse();
        updatedPosts(data)
      }catch(error){

      }
    
    }

  };

  return (
    <>
      <div className="Form-Container">
        <div className="Form-Elements">
          <div>
            <Avatar user={user} isLarge={false} profilePhoto={user?.profileImage}/>
          </div>

          <div className="Form-text">
            <textarea
              className="text"
              placeholder={placeholder}
              onChange={textChange}
              value={text}
            ></textarea>

            <hr className="hr" />
            <div className="post-button">
              <Button label={label} onClick={onSubmit} body={text} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostForm;
