import React from "react";
import styles from "./ProfilePage.module.css";
import Image from "next/image";
import Post from "../_component/Post";
import BackButton from "../_component/BackButton";
import FollowButton from "../_component/FollowButton";
export default function UserProfilePage() {
  const me = {
    id: "pgss0626",
    nickname: "메이랑",
    image: "/5Udwvqim.jpg",
  };
  return (
    <main className={styles.main}>
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
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </main>
  );
}
