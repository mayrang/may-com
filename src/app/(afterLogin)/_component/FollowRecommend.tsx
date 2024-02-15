"use client";
import React from "react";
import styles from "./FollowRecommend.module.css";
import Link from "next/link";
import Image from "next/image";
export default function FollowRecommend() {
  return (
    <Link href="/pgss0626" className={styles.container}>
      <div>
        <div className={styles.userLogo}>
          <Image src={"/5Udwvqim.jpg"} alt="pgss0626" width={40} height={40} />
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.title}>메이랑</div>
        <div className={styles.count}>@ {"pgss0626"}</div>
      </div>
      <div className={styles.followButtonSection}>
        <button>팔로우</button>
      </div>
    </Link>
  );
}
