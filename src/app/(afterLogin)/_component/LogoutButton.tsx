"use client";
import React from "react";
import styles from "./LogoutButton.module.css";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  me: Session;
};

export default function LogoutButton({ me }: Props) {
  // const { data: me } = useSession();
  const queryClient = useQueryClient()
  const router = useRouter();
  const handleLogout = () => {
    queryClient.invalidateQueries({queryKey: ["posts"]});
    queryClient.invalidateQueries({queryKey: ["users"]})
    signOut({redirect: false}).then(() => {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
        method: "POST",
        credentials: "include"
      })
      router.replace("/")
    });
  };
  console.log("logout", me);
  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      <div className={styles.logoutUserImage}>
        <Image src={me.user?.image || ""} alt="profile image" width={40} height={40} />
      </div>
      <div className={styles.logoutUserName}>
        <div>{me?.user?.name}</div>
        <div>@{me?.user?.email}</div>
      </div>
    </button>
  );
}
