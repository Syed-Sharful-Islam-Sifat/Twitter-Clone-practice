"use client"
import React from 'react'
import { useState } from 'react';
import styles from '@/styles/modals.module.css'
const RegisterModal = () => {

    const [formData, setFormData] = useState({
        name: '',
         email: '',
         password: '',
       });
     
       const handleChange = (e) => {
         const { name, value } = e.target;
         setFormData({
           ...formData,
           [name]: value,
         });
       };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{

            const response = await fetch('api/register',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
        
            const data = await response.json();
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }
  return (

    <div>

        <h1 className={styles.heading}>Create your account</h1>

    <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="username"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder='Name'
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
            placeholder='Email'
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
            placeholder='Password'
            className={styles.inputField}
            />
        </div>
        <button type="submit" className={styles.signup}>Sign Up</button>
      </form>
    </div>
  )
}

export default RegisterModal