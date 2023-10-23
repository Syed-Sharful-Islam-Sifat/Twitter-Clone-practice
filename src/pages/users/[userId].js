import React, { useEffect, useState } from 'react'
import Header from '@/components/Header';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import UserProfile from '@/components/users/UserProfile';
import UserBio from '@/components/users/UserBio';
import Home from '../Home';
const User = () => {
   
    const router = useRouter();
    const {userId} = router.query;
    const [user,setUser] = useState(null)


    useEffect(()=>{
      fetchUser()    
    },[])

 const fetchUser = async ()=>{

        try{

            if(typeof userId!=='string')throw new Error('Invalid User')
            const res = await fetch(`/api/users/${userId}`);
    
            const data = await res.json();
    
            if(res.ok)setUser(data);

        }catch(error){
           console.log(error)
        }
    }
    return (
        <>
          <Header label={user?.name} />
          <UserProfile user={user}/>
          <Home ownProfile={true} userId={userId}/>
        </>
       );
}

export default User;