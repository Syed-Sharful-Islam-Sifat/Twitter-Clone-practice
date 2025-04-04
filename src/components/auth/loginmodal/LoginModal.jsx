import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
// Import styles and assign to the 'styles' objectimport Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import styles from "@/components/auth/registermodal/registermodal.module.css";
import SubmitButton from "@/components/common/submit-button/SubmitButton";
import { useGlobal } from "@/providers/GlobalProvider";
import Loader from "@/components/common/loader/Loader";
const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pressed, setPressed] = useState(false);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useGlobal();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlepassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await signIn("credentials", {
        email,
        password,
        callbackUrl: "http://localhost:3000/Home",
        redirect: false,
      });

      if (data?.error) toast.error(data?.error);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className={styles.register_modal}>
        <div className={styles.cancel_register}>
          <button onClick={onClose}>X</button>
        </div>
        <h1 className={styles.heading}>Sign in to X</h1>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formGroup}>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlepassChange}
              placeholder="Password"
              className={styles.inputField}
            />
          </div>

          <div className={styles.signupContainer}>
            <SubmitButton text="Login" />
            {isLoading && <div className={styles.loader}><Loader /></div>}
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginModal;
