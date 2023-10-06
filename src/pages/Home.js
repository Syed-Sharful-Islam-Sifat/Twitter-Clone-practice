import Header from "@/components/Header";
import { Head } from "next/document";
import React, { useEffect, useState } from "react";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
    console.log('useEffect ran')
  }, []);

  const fetchData = async () => {
    const res = await fetch("api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const updatedPosts = (newPost)=>{
    setPosts((prevPosts) => [newPost,...prevPosts])
  }
  
  const handleEdit = (updatedPost)=>{

  setPosts((prevPosts)=> 
  prevPosts.map((post)=>{
    if(post._id===updatedPost._id)return updatedPost;
    return post
  })
  )
  }



  return (
    <>
      <Header label="Home" />
      <Form placeholder="What Is Happening?!" updatedPosts={updatedPosts} />
      {posts?.map((post) => (
        <div key={post._id}>
          <PostItem post={post} handleEdit={handleEdit}/>
        </div>
      ))}
    </>
  );
};

export default Home;
