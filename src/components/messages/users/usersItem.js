import Avatar from "@/components/Avatar";
import styles from "@/components/messages/users/useritem.module.css";
import { useNotificationDispatcher } from "@/hooks/use-notification-dispatcher";
import { NotificationContext } from "@/providers/notificationProvider";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
const UserItem = ({ user }) => {
  const { data: session } = useSession();
 
  const[notifyState,dispatchNotify] = useContext(NotificationContext);
  console.log("user on userItem", user);

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
          {notifyState.notifications.includes(user._id)?(
             <p className={styles.notification}>sent new messages</p>
          ):null}
        </div>
      </div>
    </div>
  );
};

export default UserItem;
