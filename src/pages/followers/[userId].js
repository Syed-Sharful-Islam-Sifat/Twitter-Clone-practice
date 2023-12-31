import Header from "@/components/Header";
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import FollowItem from "@/components/follow/FollowItem";
import Layout from "@/components/Layout";
const Followers = ()=>{
   
    const router = useRouter();

    const {userId} = router.query;

    const [usersFollowers,setUsersFollowers] = useState([])

    useEffect(()=>{
       fetchFollowing();

    },[])

    const fetchFollowing =  async()=>{
        
        const res = await fetch(`/api/followers/${userId}`);
        const data = await res.json();
        setUsersFollowers(data);
 
    }

    return(
        <div>
        <Layout>
            <Header label={"Followers"}/>
            {
                usersFollowers?.map((user)=>{
                   
                  return (
                     <div>
                        <FollowItem user={user}/>
                     </div>
                  )
                })
            }
        </Layout>
        </div>
    )

}

export default Followers