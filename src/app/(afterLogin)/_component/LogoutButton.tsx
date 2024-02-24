"use client";
import React from "react";
import styles from "./LogoutButton.module.css";
import Image from "next/image";
import { signOut } from "next-auth/react";
export default function LogoutButton() {
  const me = {
    id: "pgss06266",
    nickName: "mayrang",
  };
  const handleLogout = () => {
    signOut({ callbackUrl: `http://${process.env.NEXT_PUBLIC_BASE_URL}` });
  };
  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      <div className={styles.logoutUserImage}>
        <Image src={"/5Udwvqim.jpg"} alt="profile image" width={40} height={40} />
      </div>
      <div className={styles.logoutUserName}>
        <div>{me.nickName}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  );
}
