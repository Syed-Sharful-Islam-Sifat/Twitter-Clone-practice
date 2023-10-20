import React from "react";
import styles from "@/components/follow/followitem.module.css";
import Avatar from "../Avatar";
const FollowItem = ({ user }) => {
  console.log("user on follow item", user);
  return (
    <div className={styles.follow_container}>
      <div className={styles.item}>
        <Avatar user={user} isLarge={false} profilePhoto={user.profileImage} />
        <p>{user.name}</p>
      </div>
    </div>
  );
};

export default FollowItem;
