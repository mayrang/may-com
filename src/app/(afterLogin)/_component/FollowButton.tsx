"use client";
import React from "react";
import styles from "./FollowRecommend.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function FollowButton() {
  const router = useRouter();
  const { data } = useSession();
  const clickFollow = () => {
    if (data?.user) {
      router.replace("/i/flow/login");
      return null;
    }
    return;
  };
  return (
    <div className={styles.followButtonSection}>
      <button onClick={clickFollow}>팔로우</button>
    </div>
  );
}
