import { useRouter } from 'next/router'
import React from 'react'
import User from '@/models/users';
import Link from 'next/link';
const Verification = ({ message }) => {
    const router = useRouter();


    return (
        <div className='verification'>
           <h1 className=''>Verified successfully</h1>
           <Link href={'/'}>Please click here Navigate to Login Page</Link>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    // You can access the email parameter from the query string like this
    const { email } = ctx.query;

    // TODO: Fetch the user by email and update the 'isVerified' field to true in your database
    // Example code (you'll need to replace this with your actual database operations)
    const user = await User.findOne({ email });
    if (user) {
        user.isVerified = true;
        await user.save();
    }

    // Pass the email as a prop to the component
    return {
        props: {
           message
        }
    };
}


export default Verification