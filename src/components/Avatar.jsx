import Image from "next/image";
import { useRouter } from "next/router";

import React from "react";

const Avatar = ({ user, isLarge, profilePhoto }) => {
  const router = useRouter();

  const handleAvatarClicked = () => {
    const url = `/users/${user._id}`;
    router.push(url);
  };

  return (
    <div
      className={isLarge ? "Image-container-big" : "image-container-small"}
      onClick={handleAvatarClicked}
    >
      {isLarge ? (
        <Image
          src={
            profilePhoto ? `/images/${profilePhoto}` : "/images/placeholder.png"
          }
          alt="Avatar"
          width={100}
          height={100}
          style={{
            objectFit: "cover",
            borderRadius: "100%",
          }}
        />
      ) : (
        <Image
          src={
            profilePhoto ? `/images/${profilePhoto}` : "/images/placeholder.png"
          }
          alt="Avatar"
          width={50}
          height={50}
          style={{
            objectFit: "cover",
            borderRadius: "100%",
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
