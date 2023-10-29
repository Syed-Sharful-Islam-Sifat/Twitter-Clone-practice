import Image from 'next/image'
import Modal from '@/components/auth/Modal';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import RegisterModal from '@/components/auth/RegisterModal';
import LoginModal from '@/components/auth/LoginModal';
import Header from '@/components/Header';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Toaster,toast } from 'react-hot-toast';
import { signOut } from 'next-auth/react';
export default function Home() {
   console.log('Home page')
  const[regisOpen,setRegisOpen] = useState(false)
  const[logisOpen,setLogisOpen] = useState(false)
   const router = useRouter();
  const {data:session}  = useSession();

  

  if(session&&session.isVerified){

    if(router.pathname==='/'){
      router.push('/Home')
    }
  }


  return (

    <>
      
        <div>
         <div className='auth-reg'>
           <button onClick={() => setRegisOpen(true)} disabled={regisOpen || logisOpen}>
             Create an account
           </button>
           <Modal isOpen={regisOpen} onClose={() => setRegisOpen(false)}>
             <RegisterModal />
           </Modal>
         </div>
     
         <div className='auth-login'>
           <button onClick={() => setLogisOpen(true)} disabled={logisOpen || regisOpen}>
             Sign In
           </button>
           <Modal isOpen={logisOpen} onClose={() => setLogisOpen(false)}>
             <LoginModal />
           </Modal>
         </div>
       </div>
      
    
    </>
  )
}
