import { AiFillGithub } from "react-icons/ai";
import styles from "@/components/auth/githubsignin/gitlogin.module.css";
import { signIn } from "next-auth/react";
export default function GithubLogin() {
  return (
    <div>
     
        <button className={styles.git_button} onClick={()=>signIn("github", {callbackUrl: 'http://localhost:3000/Home'})}>
          <div className={styles.github_icon}>
            <AiFillGithub size={24} style={{color: 'black'}}/>
          </div>

          <div className={styles.github_p}>
            <p>Sign in with Github</p>
          </div>
        </button>
      
    </div>
  );
}
