import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
// Import styles and assign to the 'styles' objectimport Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import styles from "@/components/auth/registermodal/registermodal.module.css";
const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pressed, setPressed] = useState(false);
  const { data: session } = useSession();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlepassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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

          <div className={styles.signup_container}>
            <button type="submit" className={styles.signup}>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginModal;
