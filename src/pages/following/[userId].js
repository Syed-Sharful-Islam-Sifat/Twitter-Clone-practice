import Header from "@/components/Header";
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import FollowItem from "@/components/follow/FollowItem";
import Layout from "@/components/Layout";
const Following = ()=>{
   
    const router = useRouter();

    const {userId} = router.query;

    const [usersFollowing,setUsersFollowing] = useState([])

    useEffect(()=>{
       fetchFollowing();

    },[])

    const fetchFollowing =  async()=>{
        
        const res = await fetch(`/api/following/${userId}`);
        const data = await res.json();
        console.log('data on following',data);
        setUsersFollowing(data.usersFollowing);
 
    }

    return(

        
        <div>
            <Layout>
            <Header label={"Following"}/>
            {
                usersFollowing?.map((user)=>{
                   
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

export default Following