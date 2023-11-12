import Avatar from "@/components/Avatar";
import styles from "@/components/messages/users/useritem.module.css";
import notificationActions from "@/libs/actions/notificationActions";
import { useMessage } from "@/providers/messageProvider";
import { NotificationContext } from "@/providers/notificationProvider";

import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
const UserItem = ({ user }) => {
  const { data: session } = useSession();
  const [notifyState,dispatchNotify] = useContext(NotificationContext);

  useEffect(()=>{
   dispatchNotify(notificationActions.GET_NOTIFICATIONS,user._id)
  },[])
  console.log("state on userItem", notifyState);

  return (
    <div className={styles.main_container}>
      <div className={styles.profile_container}>
        <div className={styles.profile}>
          <Avatar
            user={user}
            isLarge={false}
            profilePhoto={user.profileImage}
          />
          <p className={styles.username}>{user.name}</p>
          <p className={styles.at_username}>@{user.name}</p>
           {notifyState.notifications.includes(user._id)?
             (
              <p style={{ color: 'Green' }}>new message</p>
             ):null 
          }
        </div>
      </div>
    </div>
  );
};

export default UserItem;
