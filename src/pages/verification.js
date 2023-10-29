import { useRouter } from 'next/router'
import React from 'react'
import User from '@/models/users';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
const Verification = ({ message }) => {
    const router = useRouter();
    const {data: session} = useSession();

    console.log(session)

    if(session?.isVerified){
        if(router.pathname==='/verification')router.push('/Home');
    }
    
    return (
        <div className='verification'>
           <h1 className='title'>{message}</h1>
           <Link href={'/'}>Login through this link</Link>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    // You can access the email parameter from the query string like this
    const { email } = ctx.query;
    let message = 'Something went wrong! Verification failed';
    // TODO: Fetch the user by email and update the 'isVerified' field to true in your database
    // Example code (you'll need to replace this with your actual database operations)
    const user = await User.findOne({ email });
    if (user) {
        user.isVerified = true;
        await user.save();
        message = 'You have successfully verified your account'
    }

    // Pass the email as a prop to the component
    return {
        props: {
           message
        }
    };
}


export default Verification