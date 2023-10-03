import React from 'react'

const Button = ({label,onClick,body}) => {
    console.log('body-->',body);
  return (
        <button disabled={!body} onClick={onClick}>{label}</button>
  )
}

export default Button;