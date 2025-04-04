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
import { RiTwitterXFill } from "react-icons/ri";
export default function Home() {
  console.log("Home page");
  const [regisOpen, setRegisOpen] = useState(false);
  const [logisOpen, setLogisOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  console.log("session on index page", session);

  if (session) {
    if (router.pathname === "/") {
      router.push("/Home");
    }
  }

  return (
    <div className="main-container">
          {(regisOpen || logisOpen) && <div className="modal-overlay"></div>}
      <div className={`auth ${(regisOpen || logisOpen) ? 'blur-background' : ''}`}>
        <div className="icon-main-container">
          <div className="tweet-icon-conatainer">
            <div>
              <RiTwitterXFill className="tweet" />
            </div>
          </div>
        </div>

        <div className="auth-second-part">
          <div className="happening-now-container">
            <h1>Happening now</h1>
          </div>

          <div className="inviation-heading">
            <h1 className>Join today</h1>
          </div>
          <button
            onClick={() => setRegisOpen(true)}
            disabled={regisOpen || logisOpen}
            className="register-btn"
          >
            Create an account
          </button>


          {!regisOpen ? (
            <>
              <button
                onClick={() => setLogisOpen(true)}
                disabled={logisOpen || regisOpen}
                className="sign-in-btn"
              >
                Sign In
              </button>

              <div className="or-container">
                <div className="first-line"></div>

                <span>
                  <p className="or-p">or</p>
                </span>

                <div className="second-line"></div>
              </div>
            </>
          ) : null}
          {!regisOpen && !logisOpen ? <GithubLogin /> : null}
        </div>
        {regisOpen ? (
          <div className="modal-container">
            <RegisterModal
              isOpen={regisOpen}
              onClose={() => setRegisOpen(false)}
            />
          </div>
        ) : null}
        {logisOpen ? (
          <div className="modal-container">
            <LoginModal
              isOpen={logisOpen}
              onClose={() => setLogisOpen(false)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
