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

const RegisterModal = ({ regisOpen, onClose }) => {
  const [isLoading, setIsLoading] = useGlobal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await registerApi(formData);
      const data = await response.json();
      console.log('response status', response.status)
      if (response.ok) {
        toast.success(data?.message);
      }
      console.log(data);
    } catch (err) {
      toast.error(data?.message)
      console.log('data error message', data);
    }
    setIsLoading(false);
  };
  console.log({ isLoading })
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

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="username"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={styles.inputField}
            />
          </div>
          <div className={styles.signupContainer}>
            <SubmitButton text="Sign Up" />
            {isLoading && <div className={styles.loader}><Loader /></div>}
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
