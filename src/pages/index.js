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
    <>
      <div className="auth">
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
          {regisOpen ? (
            <div className="auth-reg">
              <RegisterModal
                isOpen={regisOpen}
                onClose={() => setRegisOpen(false)}
              />
            </div>
          ) : null}

          {!regisOpen ? (
            <>
              <button
                onClick={() => setLogisOpen(true)}
                disabled={logisOpen || regisOpen}
                className="sign-in-btn"
              >
                Sign In
              </button>
              {logisOpen ? (
                <div className="auth-login">
                  <LoginModal
                    isOpen={logisOpen}
                    onClose={() => setLogisOpen(false)}
                  />
                </div>
              ) : null}

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
      </div>
    </>
  );
}
