import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import Button from "../button/Button";
import { useSession } from "next-auth/react";
import PostImage from "./PostImage";
import { Toaster , toast } from "react-hot-toast";
import { getUserAction } from "@/libs/actions/userActions";
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
  updatedPosts,
  imageFile,
}) => {
  const [text, setText] = useState(postText);
  const [user, setUser] = useState();
  const [tweetFile, setTweetFile] = useState(null);
  const [edtImage, setEditImage] = useState(imageFile);
  const { data: session } = useSession();
  const [postData, setPostData] = useState({
    name: session.user.name,
    text: "",
    contentType: contentType,
    parentId: postId,
    image: imageFile,
  });
  const textChange = (e) => {
    setText(e.target.value);
    setPostData({
      ...postData,
      text: e.target.value,
    });
  };

  useEffect(() => {
    fetchUser();
    console.log("on PostForm", user);

    if (contentType === "post") {
      setPostData({
        ...postData,
        contentType: "comment",
      });
    } else {
      setPostData({
        ...postData,
        contentType: "reply",
      });
    }

    if(type==='edit'){
      setPostData({
        ...postData,
        text: postText
      })
    }
  }, []);

  const fetchUser = async () => {
    const res = await getUserAction(session)
    const data = await res.json();
    setUser(data);
    console.log("fetchUser", user);
  };

  const imageRemove = async () => {
    setEditImage(null);
    const res = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({...postData , image:null}),
    });

    const data = await res.json();
    handleEdit(data, data.contentType);
  };

  const onCancel = () => {
    setTweetFile(null);
  };

  const handleTweetFile = (event) => {
    console.log("on form", event);
    if (event.target.files) {
      const file = event.target.files[0];
      console.log("file----->", file);
      setTweetFile(file);
    }

    event.target.value = "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(contentType, postId, text);

    let parentId = postId;

    if (type === "edit") {

      try {
        const formData = new FormData();

        if (tweetFile) {
          formData.append("tweet_photo", tweetFile);
        }

        const res = await fetch("http://localhost:3000/api/upload", {
          method: "POST",
          body: formData,
        });
       
        if (res.ok) {
          const imageFiles = await res.json();
          const updatedData = {
            data: imageFiles,
          };

          const response = await fetch(`/api/posts/${postId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },

           
            body: JSON.stringify({...postData,image:imageFiles.tweetPhoto||imageFile}),
          });

          const data = await response.json();
          console.log(
            "imageFiles--------------------->",
            imageFiles.tweetPhoto
          );
          makeEditFalse();
          handleEdit(data,data.contentType);
        }
      } catch (error) {
        console.log(error)
      }


    } else {
      try {
        const formData = new FormData();

        if (tweetFile) {
          formData.append("tweet_photo", tweetFile);
        }

        const res = await fetch("http://localhost:3000/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const imageFiles = await res.json();
          const updatedData = {
            data: imageFiles,
          };

          console.log(
            "imageFiles--------------------->",
            imageFiles.tweetPhoto
          );

          console.log("postData on postForm", postData);

          const response = await fetch("http://localhost:3000/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              ...postData,
              image: imageFiles.tweetPhoto,
            }),
          });

          const data = await response.json();
          toast.success('Posted')
          updatedPosts(data);
          makeReplyFalse()
        }

      } catch (error) {}
    }
  };

  return (
    <>
      <div><Toaster/></div>
      <div className="Form-Container">
        <div className="Form-Elements">
          <div>
            <Avatar
              user={user}
              isLarge={false}
              profilePhoto={user?.profileImage}
            />
          </div>

          <div className="Form-text">
            <textarea
              className="text"
              placeholder={placeholder}
              onChange={textChange}
              value={text}
            ></textarea>

            <hr className="hr" />
            <div className="tweet-image-upload">
              {type === "edit" ? (
                <div className="image-edit">
                  {edtImage && (
                    <div className="image-file">
                      <span className="image-file">{edtImage}</span>
                      <button onClick={imageRemove}>Remove</button>
                    </div>
                  )}
                </div>
              ) : null}
              <PostImage
                handleTweetFile={handleTweetFile}
                tweetFile={tweetFile}
                onCancel={onCancel}
              />
            </div>
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
