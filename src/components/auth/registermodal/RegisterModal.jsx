"use client";
import React from "react";
import { useState } from "react";
import styles from "@/components/auth/registermodal/registermodal.module.css";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import registerApi from "@/libs/actions/sign-up-actions";
import SubmitButton from "@/components/common/submit-button/SubmitButton";
import { useGlobal } from "@/providers/GlobalProvider";
import Loader from "@/components/common/loader/Loader";
import { validateName, validateEmail, validatePassword } from "@/libs/utils/helper";
const RegisterModal = ({ regisOpen, onClose }) => {
  const [isLoading, setIsLoading] = useGlobal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  // Track if fields have been touched
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the field as user types
    let error = "";
    if (name === "name") {
      error = validateName(value);
    } else if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  // Handle blur event to mark field as touched
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const validateForm = () => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    setErrors({ name: nameError, email: emailError, password: passwordError });
    return nameError === "" && emailError === "" && passwordError === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }
    try {
      setIsLoading(true);
      const response = await registerApi(formData);
      const data = await response.json();
      console.log('response status', response.status)
      if (response.status === 200) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error(err?.message)
      console.log('data error message', data);
    }
    setIsLoading(false);
  };

  // Helper function to determine input class based on error state
  const getInputClassName = (fieldName) => {
    return `${styles.inputField} ${errors[fieldName] && touched[fieldName] ? styles.errorInput : ''}`;
  };

  return (
    <div className={styles.register}>
      <div>
        <Toaster />
      </div>
      <div className={styles.register_modal}>
        <div className={styles.cancel_register}>
          <button onClick={onClose}>X</button>
        </div>
        <h2 className={styles.heading}>Create your account</h2>
        <div className={styles.formBtnGroup}>

          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formGroup}>
              <input
                type="text"
                id="username"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Name"
                className={getInputClassName('name')}
              />
              {errors.name && touched.name && <p className={styles.error}>{errors.name}</p>}
            </div>
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
          </form>
          <div className={styles.signupContainer}>
            <SubmitButton
              text="Sign Up"
              disabled={isLoading || Object.values(errors).some(error => error !== "")}
              onSubmit={(e) => handleSubmit(e)}
            />
            {isLoading && <div className={styles.loader}><Loader /></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
