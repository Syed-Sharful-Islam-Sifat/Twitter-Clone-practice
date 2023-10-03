import Header from '@/components/Header'
import { Head } from 'next/document'
import React from 'react'
import Form from '@/components/Form'
import PostItem from '@/components/posts/PostItem'
export async function getServerSideProps(context){
  
  const res = await fetch('http://localhost:3000/api/posts');
  const data = await res.json();
  

  return {
    props:{
      posts:data
    }
  }
  

}
const Home = ({posts}) => {
 console.log('posts-->',posts)
   return(
     <>
       <Header label = "Home"/>
       <Form placeholder='What Is Happening?!'/>
       {posts.map((post)=>(
        <PostItem post = {post}/>
       ))

       }
     </>
   )
}

export default Home