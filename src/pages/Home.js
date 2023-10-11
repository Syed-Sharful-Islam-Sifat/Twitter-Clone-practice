import Header from "@/components/Header";
import { Head } from "next/document";
import React, { useEffect, useState } from "react";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
import { BiSkipPrevious } from "react-icons/bi";
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
    console.log("useEffect ran");
  }, []);

  const fetchData = async () => {
    const res = await fetch("api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const updatedPosts = (newPost,parentId) => {
   if(newPost.contentType==='post') setPosts((prevPosts) => [newPost, ...prevPosts]);

   else if(newPost.contentType==='comment'){
     setPosts((prevPosts)=>
      (prevPosts).map((post)=>{
        if(post._id===parentId){
          const updatedPost = {...post};

          if(!updatedPost.comments)updatedPost.comments=[];

          updatedPost.comments=[newPost,...updatedPost.comments]
          return updatedPost;
        }

        else return post
      })
     )
   }else{
      setPosts((prevPosts)=>
        (prevPosts).map((post)=>{
          const updatedPost = {...post};
          if(!updatedPost.comments)updatedPost.comments=[];

          updatedPost.comments = updatedPost.comments.map((comment)=>{
            if(comment._id===parentId){
              const updatedComment = {...comment};
              if(!updatedComment.replies)updatedComment.replies = [];
              updatedComment.replies = [newPost,...updatedComment.replies];
              return updatedComment;
            }else{
              return comment
            }
          })

          return updatedPost;
        })
      )}
  };

  const handleEdit = (updatedPost,type) => {
   setPosts((prevPosts)=>
    (prevPosts).map((post)=>{
        if(type==='post'){
           if(post._id===updatedPost._id)return updatedPost;

           return post;
        }

        else if(type=='comment'){
          const updatedComments = post?.comments?.map((comment)=>{
            if(comment._id===updatedPost._id)return updatedPost;
            return comment;
          })

          return {...post,comments:updatedComments}
        }

        else{
          const updatedComments = post.comments.map((comment)=>{
            const updatedReplies = comment.replies.map((reply)=>{
              if(reply._id===updatedPost._id)return updatedPost;
              return reply;
            })
            return {...comment,replies:updatedReplies}
          })

          return {...post,comments:updatedComments}
        }
    })
   )
  };

  const handleDelete = (deletedPost) => {
   // console.log('deletedPost , parentId',deletedPost,parentId)
     setPosts((prevPosts)=>{
         if(deletedPost.contentType==='post'){
          return prevPosts.filter((post)=>post?._id!==deletedPost?._id)
         }else{
           return prevPosts.map((post)=>{
            if(deletedPost.contentType==='comment'){
              if(post._id===deletedPost.parentId){
                const updatedComments = post.comments.filter((comment)=>comment._id!==deletedPost._id)
                return {...post,comments:updatedComments}
              }else{
                return post;
              }
            }else if (deletedPost.contentType === 'reply') {
             
              const updatedComments = post.comments.map((comment) => {
                if (comment._id === deletedPost.parentId) {
                  const updatedReplies = comment.replies.filter((reply) => reply._id !== deletedPost._id);
                  return { ...comment, replies: updatedReplies };
                } else {
                  return comment;
                }
              });
              return { ...post, comments: updatedComments };
            }
           })
         }
     })
     
  }

  return (
    <>
      <Header label="Home" />
      <Form placeholder="What Is Happening?!" updatedPosts={updatedPosts} />
      {posts?.map((post) => (
        <div key={post?._id}>
          <PostItem
            post={post}
            handleEdit={handleEdit}
            updatedPosts={updatedPosts}
            handleDelete={handleDelete}
            type={'posts'}
          />
        </div>
      ))}
    </>
  );
};

export default Home;
