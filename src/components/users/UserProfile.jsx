import Image from "next/image";
import Avatar from "../Avatar";
import { useEffect, useState } from "react";
import UserBio from "./userbio/UserBio";
const UserProfile = ({ user }) => {

  if(!user)return <h1>Loading...</h1>
  
  const [coverPhoto,setCoverPhoto] = useState(user?.coverPhoto);
  const [profilePhoto,setProfilePhoto] = useState(user?.profileImage);

  console.log('coverPhoto',user?.coverPhoto,coverPhoto);
  console.log('profilePhoto',user?.profileImage,profilePhoto)
  function handleCoverChange(user){
   setCoverPhoto(user?.coverPhoto)
  }

  function handleProfileChange(user){
    setProfilePhoto(user?.profileImage);
  }
  return (
    <div>
      <div className="user-image">
         {user?.coverPhoto && (
          <Image
            src={`/images/${coverPhoto}`}
            alt="Cover Image"
            style={{ objectFit: "cover" }}
            width={850}
            height={176}
        
          />
        )}
        <div className="profile-image">
          <Avatar user={user} isLarge={true} profilePhoto={profilePhoto}/>
        </div>
      </div>
          <UserBio user={user} handleCoverChange={handleCoverChange} handleProfileChange={handleProfileChange}/>
    </div>
  );
};

export default UserProfile;
