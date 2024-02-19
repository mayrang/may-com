"use client";
import React from "react";
import styles from "../MessagePage.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function RoomChat() {
  const router = useRouter();

  const onClickChatRoom = () => {
    router.push(`/message/${"pgss0626 - pgss0626"}`);
  };
  return (
    <div onClick={onClickChatRoom} className={styles.roomChatInfo}>
      <div className={styles.roomUserInfo}>
        <b>mayrang</b>
        &nbsp;
        <span>@ pgss0626</span>
        &nbsp; · &nbsp;
        <span> {dayjs(new Date()).fromNow(true)}</span>
      </div>
      <div>3333</div>
    </div>
  );
}
