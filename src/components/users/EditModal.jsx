import React, { useState } from "react";
import Modal from "../auth/Modal";
import styles from "@/components/users/editmodal.module.css";
import Image from "next/image";
const EditModal = ({
  user,
  handleCoverChange,
  handleProfileChange,
  handleEdit,
}) => {
  const [profilefile, setProfilefile] = useState("");
  const [coverfile, setCoverfile] = useState("");

  const onSubmit = async (e) => {
    /// handle profile photo
    e.preventDefault();

    try {
      const formData = new FormData();

      if (profilefile) {
        formData.append("profile_photo", profilefile);
      }
      if (coverfile) {
        formData.append("cover_photo", coverfile);
      }

      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const imageFiles = await res.json();
        console.log("res.ok", res.status);
        const updatedData = {
          data: imageFiles,
        };

        console.log("updatedData", updatedData);

        const response = await fetch(
          `http://localhost:3000/api/users/${user._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          }
        );

        const data = await response.json();
        console.log(data);
        handleCoverChange(data);
        handleProfileChange(data);
        handleEdit();
      }
    } catch (error) {}
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.cancel_modal}>
        <button onClick={handleEdit}>X</button>
      </div>
      <form onSubmit={onSubmit}>
        <div className={styles.image_container}>
          <div className={styles.profile_image_container}>
            <div className={styles.profile_image}>
              {profilefile ? (
                <div style={{ position: "relative" }}>
                  <img
                    src={URL.createObjectURL(profilefile)}
                    alt="profile photo"
                    style={{
                      objectFit: "cover",
                      width: "130px",
                      height: "100px",
                      borderRadius: "5px",
                    }}
                  />
                  <div
                    className={styles.profile_image_cancel}
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <button onClick={() => setProfilefile("")}>X</button>
                  </div>
                </div>
              ) : null}
            </div>

            <label htmlFor="profilePhoto" className={styles.fileInputLabel}>
              {profilefile ? (
                <span className={styles.selectedFile}>{profilefile.name}</span>
              ) : (
                "Choose Profile Photo"
              )}
              <input
                type="file"
                id="profilePhoto"
                accept="image/*"
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    console.log("file ", file);
                    setProfilefile(file);
                  }
                }}
              />
            </label>
          </div>
          <div className={styles.cover_image_container}>
            <div className={styles.cover_image}>
              {coverfile ? (
                <div>
                  <img
                    src={URL.createObjectURL(coverfile)}
                    alt="profile photo"
                    style={{
                      objectFit: "cover",
                      width: "150px",
                      height: "100px",
                      borderRadius: "5px",
                    }}
                  />

                  <div
                    className={styles.cover_image_cancel}
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <button onClick={() => setProfilefile("")}>X</button>
                  </div>
                </div>
              ) : null}
              
            </div>

            <label>
              {coverfile ? coverfile.name : "Choose Cover Photo"}
              <input
                type="file"
                accept="image/*"
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];

                    setCoverfile(file);
                  }
                }}
              />
            </label>
          </div>
        </div>

        <div className={styles.save_button}>
          <button onClick={onSubmit}>Save</button>
        </div>
      </form>
    </div>
    // <div className={styles.profile_container}>
    //   <form onSubmit={onSubmit} className={styles.input_form}>
    //     <div className={styles.file_input}>
    //       <label>
    //         {profilefile ? profilefile.name : "Choose Profile Photo"}
    //         <input
    //           type="file"
    //           accept="image/*"
    //           onChange={({ target }) => {
    //             if (target.files) {
    //               const file = target.files[0];
    //               setProfilefile(file);
    //             }
    //           }}
    //         />
    //       </label>
    //     </div>

    //     <div className={styles.file_input}>
    //       <label>
    //         {coverfile ? coverfile.name : "Choose Cover Photo"}
    //         <input
    //           type="file"
    //           accept="image/*"
    //           onChange={({ target }) => {
    //             if (target.files) {
    //               const file = target.files[0];
    //               setCoverfile(file);
    //             }
    //           }}
    //         />
    //       </label>
    //     </div>
    //     <div className={styles.button_group}>
    //       <button className={styles.save_button} onClick={onSubmit}>
    //         Save
    //       </button>

    //       <button className={styles.cancel_button} onClick={handleEdit}>
    //         Cancel
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default EditModal;
