import React from 'react'
import Header from '../Header'
import UserProfile from '../users/UserProfile'
import Home from '@/pages'

const FullProfile = ({user,userId}) => {
  return (
    <>
    <Header label={user?.name} />
    <UserProfile user={user} />
    <Home ownProfile={true} userId={userId} />
    </>
  )
}

export default FullProfile