import React from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header';
import { useState , useEffect } from 'react';
import PostItem from '@/components/posts/PostItem';
const Post = () => {
    
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const[count,setCount] = useState(0);
    
    const postId = router.query.postId;
    console.log('postId-->',postId);
    
    useEffect(() => {
      fetchData();
      console.log("useEffect ran ",posts);
    }, []);
    
    useEffect(()=>{
      setCount(count+1);
      console.log('count',router.query)
    },[router.query.postId])
    const fetchData = async () => {

      const res = await fetch(`http://localhost:3000/api/posts/${postId}`);
      const data = await res.json();
      console.log('postId-->',data)
      setPosts(data);
    };
  
    const updatedPosts = (newPost) => {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    };
  
    const handleEdit = (updatedPost) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === updatedPost._id) return updatedPost;
          return post;
        })
      );
    };
  
    const handleDelete = (deletedPost) => {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => {
          if (post?._id !== deletedPost?._id) return post;
        })
      );
    };

  return (
    <>
      <Header label={'Post'}/>
      {posts?.map((post)=>(
         <div key={post._id}>
            <PostItem
              post={post}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
         </div>
        ))
      }
    </>
  )
}

export default Post