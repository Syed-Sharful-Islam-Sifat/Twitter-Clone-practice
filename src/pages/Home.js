import Header from "@/components/Header";
import { Head } from "next/document";
import React, { useEffect, useState } from "react";
import Form from "@/components/Form";
import PostFeed from "@/components/posts/PostFeed";
import { BiSkipPrevious } from "react-icons/bi";
import PostItem from "@/components/posts/PostItem";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
const Home = ({ownProfile,userId}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
    console.log("useEffect ran");
  }, []);



  const fetchData = async () => {

    if(ownProfile){
      const res = await fetch(`http://localhost:3000/api/users/posts/${userId}`);
      const data = await res.json();
    
      setPosts(data.posts);
    }

    else{
    const res = await fetch(`http://localhost:3000/api/posts`);
    const data = await res.json();
    setPosts(data.followedPosts);
   
   
    }
  };

  const updatedPosts = ({ newPost, parentId, mainPostId }) => {

    console.log("three", newPost, parentId, mainPostId);
    if (newPost.contentType === "post"&&ownProfile)
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    else if (newPost.contentType === "comment") {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === parentId) {
            const updatedPost = {
              ...post,
              commentIds: [newPost, ...post.commentIds],
            };

            return updatedPost;
          } else {
            return post;
          }
        })
      );

      console.log("creating", posts, newPost);
    } else {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          const updatedComments = post.commentIds.map((comment) => {
            if (comment._id === parentId) {
              const updatedReplies = [newPost, ...comment.commentIds];

              return { ...comment, commentIds: updatedReplies };
            } else {
              return comment;
            }
          });

          if (post._id === mainPostId) {
            return { ...post, commentIds: [newPost, ...updatedComments] };
          } else return { ...post, commentIds: updatedComments };
        })
      );
    }

    console.log("Home.js", posts);
  };

  const handleEdit = (updatedPost, type) => {
    
   
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (type === "post") {
          if (post._id === updatedPost._id) return updatedPost;

          return post;
        } else if (type == "comment") {
          const updatedComments = post?.commentIds?.map((comment) => {
            if (comment._id === updatedPost._id){
              return updatedPost;
            }
            return comment;
          });

          return { ...post, commentIds: updatedComments };
        } else {
          const updatedComments = post.commentIds.map((comment) => {
            const updatedReplies = comment.commentIds.map((reply) => {
              if (reply._id === updatedPost._id) return updatedPost;
              return reply;
            });
            return { ...comment, commentIds: updatedReplies };
          });

          return { ...post, commentIds: updatedComments };
        }
      })
    );

    console.log("after update on edit", posts);
  };

  const handleDelete = ({ deletedPost, mainPostId }) => {
    // console.log('deletedPost , parentId',deletedPost,parentId)
    setPosts((prevPosts) => {
      if (deletedPost?.contentType === "post") {
        return prevPosts.filter((post) => post?._id !== deletedPost?._id);
      } else {
        return prevPosts.map((post) => {
          if (deletedPost?.contentType === "comment") {
            if (post._id === deletedPost.parentId) {
              const updatedComments = post.commentIds.filter(
                (comment) =>
                  comment._id !== deletedPost._id &&
                  deletedPost._id !== comment.parentId
              );
              console.log("comment delete", updatedComments);
              return { ...post, commentIds: updatedComments };
            } else {
              return post;
            }
          } else if (deletedPost?.contentType === "reply") {
            const updatedComments = post.commentIds.map((comment) => {
              if (comment._id === deletedPost.parentId) {
                const updatedReplies = comment.commentIds.filter(
                  (reply) => reply._id !== deletedPost._id
                );
                return { ...comment, commentIds: updatedReplies };
              } else {
                return comment;
              }
            });

            const updatedPost = {
              ...post,
              commentIds: updatedComments,
            };

            // Filter out deletePost from post.commentIds
            updatedPost.commentIds = updatedPost.commentIds.filter(
              (comment) => comment._id !== deletedPost._id
            );

            return updatedPost;
          }
        });
      }
    });
  };


  const PostFeed =()=> 
  <div>
  {!ownProfile ? <Header label="Home" /> : null}
  {!ownProfile ? <Form placeholder="What Is Happening?!" updatedPosts={updatedPosts} /> : null}
  {posts
    ?.filter((post) => post.contentType === "post")
    .map((post) => (
      <div key={post?._id}>
        <PostItem
          post={post}
          handleEdit={handleEdit}
          updatedPosts={updatedPosts}
          handleDelete={handleDelete}
          type={"posts"}
          ownProfile={ownProfile}
        />
      </div>
    ))}
</div>


  return (
    <>
    {ownProfile?(
       
       <PostFeed/>
    ):(
       <Layout>
         <PostFeed/>
       </Layout>
    )}
     
    </>
  );
};

export default Home;
