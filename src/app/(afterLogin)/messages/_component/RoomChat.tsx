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
    <div onClick={onClickChatRoom} className={styles.roomChatInfo}>
      <div className={styles.roomUserInfo}>
        <b>{room.Receiver.nickname}</b>
        &nbsp;
        <span>@{room.Receiver.id}</span>
        &nbsp; · &nbsp;
        <span> {dayjs(room.createdAt).fromNow(true)}</span>
      </div>
      <div>{room.content}</div>
    </div>
  );
}
