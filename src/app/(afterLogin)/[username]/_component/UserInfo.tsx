"use client";
import React from "react";
import BackButton from "../../_component/BackButton";
import Image from "next/image";
import FollowButton from "../../_component/FollowButton";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/model/User";
import { getUser } from "../_lib/getUser";
import styles from "../ProfilePage.module.css";
import { useSession } from "next-auth/react";
type Props = {
  username: string;
};

export default function UserInfo({ username }: Props) {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User, Object, User, [_1: string, username: string]>({ queryKey: ["users", username], queryFn: getUser });
  const {data:me} = useSession();
  console.log("info", user);
  if (!user || error) {
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
        <h3 className={styles.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={styles.userZone}>
        <div className={styles.userRow}>
          <div className={styles.userImage}>
            <Image src={user.image} alt="profile image" width={134} height={134} />
          </div>
          <div className={styles.userName}>
            <div>{user.nickname}</div>
            <div>@ {user.id}</div>
          </div>
          {me?.user?.email !== user.id &&<FollowButton user={user}/>}
        </div>

        <div className={styles.userFollower}>
          <div>{user._count.Followers} 팔로워</div>&nbsp;
          <div>{user._count.Followings} 팔로우 중</div>
        </div>
      </div>
    </>
  );
}
