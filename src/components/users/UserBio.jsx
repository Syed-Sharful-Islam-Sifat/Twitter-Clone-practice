import React, { useMemo, useState, useEffect } from "react";
import format from "date-fns/format";
import { useSession } from "next-auth/react";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import Modal from "../auth/Modal";
import EditModal from "./EditModal";
import { useRouter } from "next/router";
const UserBio = ({ user  , handleCoverChange , handleProfileChange}) => {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState();
  const[followCount,setFollowCount]  = useState(user?.followingIds?.length);
  const [editOpen, setEditOpen] = useState(false);
  const[followers,setFollowers] = useState(0);

  const router = useRouter();
  useEffect(() => {
    fetchFollow();
  }, []);

  const showFollowing = async (e)=>{
    e.stopPropagation()
    router.push(`/following/${user._id}`);
  }
  const showFollowers = async (e)=>{
    e.stopPropagation()
    router.push(`/followers/${user._id}`);
  }

  const fetchFollow = async () => {
    const res = await fetch(`http://localhost:3000/api/follow/${user?._id}`);
    const data = await res.json();

    const response = await  fetch(`http://localhost:3000/api/followers/${user?._id}`);

    const users = await response.json();
    setIsFollowing(data);
    setFollowers(users.length);
  };

  const toggleFollow = async() => {
    console.log('togglefollow ran');
    const res = await fetch(`/api/follow/${user?._id}`,{
      method: 'PATCH'
    });
    const data = await res.json();
    
    setFollowCount(data?.followCount)
    setIsFollowing(data?.hasfollowed);

    if(isFollowing)setFollowers(followers-1);

    else
       setFollowers(followers+1)

  };
  const createdAt = () => {
    if (!user?.createdAt) {
      return null;
    }

    return format(new Date(user.createdAt), "MMMM yyyy");
  };

  return (
    <div className="bio-container">
      <div className="follow">
        {session.id === user?._id ? (
          editOpen ? (
              <EditModal user = {user} handleCoverChange={handleCoverChange} handleProfileChange={handleProfileChange}/>
            
          ) : (
            <button onClick={() => setEditOpen(true)}>Edit</button>
          )
        ) : (
          <button onClick={toggleFollow}>{isFollowing?'Unfollow':'Follow'}</button>
        )}
      </div>

      <div className="user-bio">
        <div className="username">
          <p className="name">{user?.name}</p>
          <p className="at-name">@{user?.name}</p>
        </div>

        <div className="calendar">
          <BiCalendar size={24} />
          <p className="join-date">Joined {createdAt()}</p>
        </div>

        <div className="follow-count" onClick={showFollowing}>
          <p>{user?.followingIds?.length}</p>
          <p className="following-number" onClick={(e)=>showFollowing}>Following</p>

          <p>{followers}</p>
          <p className="following-number" onClick={showFollowers}>Followers</p>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
