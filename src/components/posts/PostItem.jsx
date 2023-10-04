import React, { useState } from 'react'
import Avatar from '../Avatar'
import { useSession } from 'next-auth/react'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
const PostItem = ({post}) => {

    const {data:session} = useSession();
   
    console.log(session?.user);

     const {id} = session;
     const postId = post._id;

     console.log('post likes',post.likeIds.length)
     const [likes,setLikes] = useState(0); 
    const LikeIcons = AiOutlineHeart || AiFillHeart;
    console.log('rendered')
    const userLiked = async()=>{
      const res = await fetch("api/likes",{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({id,postId})
      })

      const data = await res.json()
      console.log(data);
      setLikes(data)
    }
  return (
    <div className='post-container'>
         <Avatar/>
         <div>
            <div className='user-profile'>
                <p className='name'>{session?.user?.name}</p>
                <span className='at-name'>@{session?.user?.name}</span>
                <span className='time'>{post.createdAt}</span>
            </div>
         </div>

         <div className='text'>
          {post.text}
         </div>

         <div className='icons'>
           <div className='comment'>
            <AiOutlineMessage size={20}/>
            <p>0</p>
           </div>

           <div className='like' onClick={userLiked}>
             <LikeIcons size={20}/>
             <p>{likes}</p>
           </div>
         </div>
    </div>
  )
}

export default PostItem