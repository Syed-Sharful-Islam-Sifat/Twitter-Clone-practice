import Header from "@/components/Header";
import Layout from "@/components/Layout"
import UsersItem from "@/components/messages/users/usersItem";
import { useState ,useEffect} from "react"
import MessageLayout from "@/components/messages/message-container/messageLayout";
const Messages = ()=>{
    
    const [users,setUsers] = useState();
    const [messageBox,setMessageBox] = useState(false);
    const [singleUser,setSingleUser] = useState();

    const handleClick = (user)=>{
      setMessageBox(true);
      setSingleUser(user);
    }
    useEffect(()=>{
      fetchUsers();
    },[])

    async function fetchUsers(){
        const res = await fetch(`/api/users`);
        const data = await res.json();
        
      setUsers(data)
    }

    if(!users)return <h1>Loading...</h1>

    return(
        <Layout currentRoute = {'Messages'} messageBox={messageBox} user={singleUser}>
          <Header label={'Messages'}/>
          {users.map((user)=>{
           return(
               <div onClick={()=>handleClick(user)}>
                   <UsersItem user={user}/>
               </div>
           )
          })}
        </Layout>
    )
 
}

export default Messages 