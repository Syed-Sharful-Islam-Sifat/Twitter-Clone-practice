import styles from '@/components/messages/selectuser/selectuser.module.css'

const SelectUser = ()=>{

    return(
       <div className={styles.main_container}>
         <div className={styles.notify}>
           <p>Select an user to send message</p>
         </div>
       </div>
    )
}

export default SelectUser