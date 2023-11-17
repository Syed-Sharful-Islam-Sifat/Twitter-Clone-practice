import React from 'react'
import styles from '@/components/button/button.module.css'
const Button = ({label,onClick,body}) => {
    console.log('body-->',body);
  return (
       <div className={styles.post_button}>
         <button disabled={!body} onClick={onClick} className={styles.button}>{label}</button>
       </div>
  )
}

export default Button;