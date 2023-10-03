import React, { useState } from "react";
import { signIn } from "next-auth/react";
import styles from '@/styles/modals.module.css'; // Import styles and assign to the 'styles' object
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginModal = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {

    setEmail(e.target.value);
  };
  const handlepassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        const data = await signIn('credentials',{
            email,
            password,
            redirect:false
        })

        console.log(data?.error);

    }catch(err){
      console.log(err.message)
    }
  }

  return (
    <div>
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
        <button type="submit" className={styles.signup}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginModal;

