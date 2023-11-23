"use client";
import React from "react";
import { useState } from "react";
import styles from "@/components/auth/registermodal/registermodal.module.css";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
const RegisterModal = ({ regisOpen, onClose }) => {
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
      const response = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data?.message);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
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
          <div className={styles.signup_container}>
            <button type="submit" className={styles.signup}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
