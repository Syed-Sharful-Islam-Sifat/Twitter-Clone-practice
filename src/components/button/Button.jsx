import React from 'react'
import styles from '@/components/button/button.module.css'
const Button = ({label,onClick,body}) => {
    console.log('body-->',body);
  return (
        <button disabled={!body} onClick={onClick} className={styles.button}>{label}</button>
  )
}

export default Button;