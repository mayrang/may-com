"use client";
import React from "react";
import styles from "../MessagePage.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useRouter } from "next/navigation";
import { Room } from "@/model/Room";
import { useSession } from "next-auth/react";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  room: Room;
};

export default function RoomChat({ room }: Props) {
  const router = useRouter();
  const { data: me } = useSession();
  const user = me?.user?.email === room.Receiver.id ? room.Receiver : room.Sender;
  const onClickChatRoom = () => {
    if (!me?.user?.email) {
      return null;
    }
    const roomArray = [room.Receiver.id, me.user.email];
    roomArray.sort();
    const roomString = roomArray.join("-");
    router.push(`/messages/${roomString}`);
  };
  return (
    <div onClick={onClickChatRoom} className={styles.room}>
    <div className={styles.roomUserImage}>
      <img src={user.image} alt="profile image" />
    </div>
    <div  className={styles.roomChatInfo}>
      <div className={styles.roomUserInfo}>
        <b>{user.nickname}</b>
        &nbsp;
        <span>@{user.id}</span>
        &nbsp; · &nbsp;
        <span> {dayjs(room.createdAt).fromNow(true)}</span>
      </div>
      <div>{room.content}</div>
    </div>
    </div>
  );
}
