import Header from "@/components/Header";
import Layout from "@/components/Layout"
import UsersItem from "@/components/messages/users/usersItem";
import { useState ,useEffect} from "react"
const Messages = ()=>{
    
    const [users,setUsers] = useState();

    useEffect(()=>{
      fetchUsers();
    },[])

    async function fetchUsers(){
        const res = await fetch(`/api/users`);
        const data = await res.json();
        
        setUsers((prev)=>{
            if(!prev)return data
          return [...prev,...data]
        })
    }

    return(
        <Layout>
          <Header label={'Messages'}/>
          {users.map((user)=>{
            <UsersItem user={user}/>
          })}
        </Layout>
    )
 
}

export default Messages 