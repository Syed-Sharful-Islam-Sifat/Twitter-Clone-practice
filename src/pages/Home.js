import Header from "@/components/Header";
import { Head } from "next/document";
import React, { useEffect, useState } from "react";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("api/posts");
    const data = await res.json();
    setPosts(data);
  };


  return (
    <>
      <Header label="Home" />
      <Form placeholder="What Is Happening?!" fetchData={fetchData} />
      {posts?.map((post) => (
        <div key={post._id}>
          <PostItem post={post} />
        </div>
      ))}
    </>
  );
};

export default Home;
