"use client";
import React from "react";
import styles from "./FollowRecommend.module.css";
import Link from "next/link";
import Image from "next/image";
import FollowButton from "./FollowButton";
import { User } from "@/model/User";
import { useSession } from "next-auth/react";

type Props = {
  user: User;
};

export default function FollowRecommend({ user }: Props) {
  const {data} = useSession();
  console.log(user);
  return (
    <Link href={`/${user.id}`} className={styles.container}>
      <div>
        <div className={styles.userLogo}>
          <Image src={user.image} alt={user.id} width={40} height={40} />
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.title}>{user.nickname}</div>
        <div className={styles.count}>@ {user.id}</div>
      </div>
      {user && user.id !== data?.user?.email && <FollowButton user={user}/>}
    </Link>
  );
}
