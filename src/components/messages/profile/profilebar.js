import Avatar from "@/components/Avatar"
import styles from '@/components/messages/profile/profilebar.module.css'
const ProfileBar = ({user})=>{
  
    return (
        <div className={styles.profile_container}>
           <div className={styles.profile}>
             <Avatar user={user} isLarge={false} profilePhoto={user.profileImage}/>
             <p className={styles.profile_name}>{user.name}</p>
           </div>
        </div>
    )
}

export default ProfileBar