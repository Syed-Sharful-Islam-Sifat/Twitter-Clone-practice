import Avatar from "@/components/Avatar"
import styles from '@/components/messages/users/useritem.module.css'
import { useSession } from "next-auth/react"
const  UserItem = ({user})=>{

    const {data:session} = useSession()
    
    return(
        <div className={styles.main_container}>
           <div className={styles.profile_container}>
              <Avatar user={user} isLarge={flase} profilePhoto={user.profileImage}/>
           </div>
        </div>
    )
}

export default UserItem