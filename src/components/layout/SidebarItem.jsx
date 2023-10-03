import React from 'react'

const SidebarItem = ({href,label,Icon}) => {

  console.log(label)    
  return (
    <div className='sidebar-items'>
      <div className='item'>
        <Icon size={24} color='white'/>
        <p className='item-paragraph'>{label}</p>
      </div>
    </div>
  )
}

export default SidebarItem