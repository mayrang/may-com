"use client";
import React from "react";
import BackButton from "../../_component/BackButton";
import Image from "next/image";
import FollowButton from "../../_component/FollowButton";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/model/User";
import { getUser } from "../_lib/getUser";
import styles from "../ProfilePage.module.css";
type Props = {
  username: string;
};

export default function UserInfo({ username }: Props) {
  const {
    data: me,
    isLoading,
    error,
  } = useQuery<User, Object, User, [_1: string, username: string]>({ queryKey: ["users", username], queryFn: getUser });

  if (!me || error) {
    return (
      <>
        <div className={styles.header}>
          <BackButton />
          <h3 className={styles.headerTitle}>{username}</h3>
        </div>
        <div className={styles.userZone}>
          <div className={styles.userRow}>
            <div className={styles.userImage}></div>
            <div className={styles.userName}>@{username}</div>
          </div>

          <div
            style={{
              height: 100,
              alignItems: "center",
              fontSize: 31,
              fontWeight: "bold",
              justifyContent: "center",
              display: "flex",
            }}
          >
            계정이 존재하지 않음
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <BackButton />
        <h3 className={styles.headerTitle}>{me.nickname}</h3>
      </div>
      <div className={styles.userZone}>
        <div className={styles.userRow}>
          <div className={styles.userImage}>
            <Image src={me.image} alt="profile image" width={134} height={134} />
          </div>
          <div className={styles.userName}>
            <div>{me.nickname}</div>
            <div>@ {me.id}</div>
          </div>
          <FollowButton />
        </div>

        <div className={styles.userFollower}>
          <div>0 팔로워</div>&nbsp;
          <div>0 팔로우 중</div>
        </div>
      </div>
    </>
  );
}
