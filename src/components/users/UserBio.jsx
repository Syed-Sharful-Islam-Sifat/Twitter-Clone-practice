import React, { useMemo, useState, useEffect } from "react";
import format from "date-fns/format";
import { useSession } from "next-auth/react";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import Modal from "../auth/Modal";
import EditModal from "./EditModal";
const UserBio = ({ user  , handleCoverChange , handleProfileChange}) => {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState(null);
  const [editOpen, setEditOpen] = useState(false);


  useEffect(() => {
    fetchFollow();
  }, [isFollowing]);

  const fetchFollow = async () => {
    const res = await fetch(`http://localhost:3000/api/follow/isFollowing/${user?._id}`);
    const data = await res.json();
    setIsFollowing(data);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
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
          <Button
            onClick={toggleFollow}
            label={isFollowing ? "Unfollow" : "Follow"}
            body={true}
          />
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

        <div className="follow-count">
          <p>{user?.followingIds?.length}</p>
          <p className="following-number">Following</p>

          <p>0</p>
          <p className="following-number">Followers</p>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
