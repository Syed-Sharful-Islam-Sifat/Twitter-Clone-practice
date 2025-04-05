import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import styles from "@/components/auth/registermodal/registermodal.module.css";
import SubmitButton from "@/components/common/submit-button/SubmitButton";
import { useGlobal } from "@/providers/GlobalProvider";
import Loader from "@/components/common/loader/Loader";
import { validateEmail, validatePassword } from "@/libs/utils/helper";

const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useGlobal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the field as user types
    let error = "";
    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const validateForm = () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    setErrors({ email: emailError, password: passwordError });
    return emailError === "" && passwordError === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }
    try {
      setIsLoading(true);
      const data = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        callbackUrl: "http://localhost:3000/Home",
        redirect: false,
      });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success("Login successful!");
        onClose();
      }
    } catch (err) {
      console.log(err.message);
      toast.error("An error occurred during login");
    }
    setIsLoading(false);
  };

  // Helper function to determine input class based on error state
  const getInputClassName = (fieldName) => {
    return `${styles.inputField} ${errors[fieldName] && touched[fieldName] ? styles.errorInput : ''}`;
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
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              className={getInputClassName('email')}
            />
            {errors.email && touched.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              className={getInputClassName('password')}
            />
            {errors.password && touched.password && <p className={styles.error}>{errors.password}</p>}
          </div>

          <div className={styles.signupContainer}>
            <SubmitButton 
              text="Login" 
              disabled={isLoading || Object.values(errors).some(error => error !== "")}
              onSubmit={handleSubmit}
            />
            {isLoading && <div className={styles.loader}><Loader /></div>}
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginModal;
