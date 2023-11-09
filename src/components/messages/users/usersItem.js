import Avatar from "@/components/Avatar";
import styles from "@/components/messages/users/useritem.module.css";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
const UserItem = ({ user }) => {
  const { data: session } = useSession();

  const [state,dispatch] = useNotificationDispatcher({
    users:[]
  })

  useEffect(()=>{
    dispatch(notificationActions.GET_USERS);
  },[])

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

          {state.users.includes(user._id)?(
             <p className={styles.notify}>sent new messages</p>
          ):null}
        </div>
      </div>
    </div>
  );
};

export default UserItem;
