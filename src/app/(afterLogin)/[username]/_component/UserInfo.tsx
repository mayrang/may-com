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
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  console.log("info", user);

  const clickMessage = () => {
    if(!me?.user?.email){
      return null;
    }
    const roomArray = [user?.id, me.user.email]
    roomArray.sort();
    const roomString = roomArray.join("-");
    router.push(`/messages/${roomString}`);
  }



  
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
          {me?.user?.email && <button className={styles.messageButton} onClick={clickMessage}>
            <svg viewBox="0 0 24 24" width="18" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03"><g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path></g></svg>
          </button>}
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
