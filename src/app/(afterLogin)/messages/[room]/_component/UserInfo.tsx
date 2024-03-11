"use client";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import { User } from "@/model/User";
import Link from "next/link";
import React from "react";
import styles from "../ChatRoomPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/app/(afterLogin)/[username]/_lib/getUser";
type Props = {
  userId: string;
};

export default function UserInfo({ userId }: Props) {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User, Object, User, [_1: string, username: string]>({ queryKey: ["users", userId], queryFn: getUser });
  if (!user || isLoading) {
    return null;
  }
  return (
    <>
      <div className={styles.header}>
        <BackButton />
        <h2>{user.nickname}</h2>
      </div>
      <Link href={`/${user.id}`} className={styles.userInfo}>
        <img src={user.image as string} alt={user.id} />
        <div>
          <b>{user.nickname}</b>
        </div>
        <div>@{user.id}</div>
      </Link>
    </>
  );
}
