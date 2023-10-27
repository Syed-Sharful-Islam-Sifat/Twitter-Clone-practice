import React from 'react'
import styles from '@/components/auth/modals.module.css';
const Modal = ({isOpen,onClose,children}) => {

    console.log(isOpen)

    if(!isOpen)return null;
  return (
    <div className={styles.modalOverlay}>
       <div className={styles.modal}>
        <button onClick={onClose}>X</button>
       </div>
        {children}
    </div>
  )
}

export default Modal