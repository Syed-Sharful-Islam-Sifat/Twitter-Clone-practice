import React from 'react'
import styles from '@/components/modal/modal.module.css'
import { useModal } from '@/providers/modalProvider'
const Modal = ({children}) => {

  const [isOpen,setIsOpen] = useModal
  return (
    <div className={isOpen?(styles.nonmodal):(styles.modal)}>
      {children}
    </div>
  )
}

export default Modal