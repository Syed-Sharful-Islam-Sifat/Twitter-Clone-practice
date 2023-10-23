import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import Button from "../Button";
import { useSession } from "next-auth/react";
const PostForm = ({
  placeholder,
  postText,
  label,
  name,
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

    if (type === "edit") {
      const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
      });

      const data = await res.json();
      console.log('edited',data.contentType)
      
      
      console.log('editeeeeeeeeeeeeeeed data',data);
      makeEditFalse();
      handleEdit(data,data.contentType);
      
      
    } else {

      const name = session?.user?.name;

      console.log('on Postform',name)

        if(contentType==='post')contentType = 'comment'
         else
         contentType = 'reply'
      try{
        
        const res = await fetch("http://localhost:3000/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({parentId,contentType,text,name}),
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
