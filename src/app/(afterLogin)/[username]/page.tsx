import React from "react";
import styles from "./ProfilePage.module.css";
import Image from "next/image";
import Post from "../_component/Post";
export default function UserProfilePage() {
  const me = {
    id: "pgss0626",
    nickname: "메이랑",
    image: "/5Udwvqim.jpg",
  };
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <button className={styles.backButton}>
          <svg
            width="24"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
          >
            <g>
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
            </g>
          </svg>
        </button>
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
