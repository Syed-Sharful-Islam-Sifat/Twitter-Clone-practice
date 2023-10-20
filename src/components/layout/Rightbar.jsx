import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const Rightbar = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const {data:session} = useSession();
  const fetchUsers = async () => {
    const res = await fetch(`/api/following/${session.id}`);
    const data = await res.json();
    setUsers(data.usersNotFollowing);
  };

  const router = useRouter();
  async function handleClick(user){
    router.push(`/users/${user._id}`)
  }

  console.log('session on rightbar',session)
  return (
    <div className="rightbar-follow">
      <div className="following">
        <h2 className="heading">Who to follow</h2>

        <div className=""></div>
        {users.map((user) => {
          return (
            <div key={user._id} className="user-container" onClick={(user)=>handleClick}>
              <Avatar user = {user} isLarge={false} profilePhoto={user?.profileImage}/>
              <div className="user-profile">
                <div>
                <p className="user-name">{user.name}</p>
                </div>
                <div>
                 <p className="at-user-name">@{user.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rightbar;
