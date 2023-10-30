import Image from "next/image";
import Modal from "@/components/auth/Modal";
import Link from "next/link";
import { useEffect, useState } from "react";
import RegisterModal from "@/components/auth/registermodal/RegisterModal";
import LoginModal from "@/components/auth/loginmodal/LoginModal";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import GithubLogin from "@/components/auth/githubsignin/login";
import { AiOutlineTwitter } from "react-icons/ai";
export default function Home() {
  console.log("Home page");
  const [regisOpen, setRegisOpen] = useState(false);
  const [logisOpen, setLogisOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  console.log('session on index page',session)

  if (session) {
    if (router.pathname === "/") {
      router.push("/Home");
    }
  }

  return (
    <>
      <div className="auth">
        <div className="tweet-icon-container">
          <AiOutlineTwitter className="tweet-icon" />
        </div>

        <div className="auth-second-part">
           
           <h1 className="invitation-heading">Join us today</h1>
            <button
              onClick={() => setRegisOpen(true)}
              disabled={regisOpen || logisOpen}
              className="register-btn"
            >
              Create an account
            </button>
          {regisOpen?(
            <div className="auth-reg">
            <Modal isOpen={regisOpen} onClose={() => setRegisOpen(false)}>
              <RegisterModal />
            </Modal>
          </div>
          ):null
        }
          

         {!regisOpen? (
          <>
          
          <button
            onClick={() => setLogisOpen(true)}
            disabled={logisOpen || regisOpen}
            className="sign-in-btn"
          >
            Sign In
          </button>
          
          <div className="auth-login">
          <Modal isOpen={logisOpen} onClose={() => setLogisOpen(false)}>
            <LoginModal />
          </Modal>
        </div>
          </>
         ): null} 
          {!regisOpen&&!logisOpen?(
            <GithubLogin />
          ):null}
        </div>
      </div>
    </>
  );
}
