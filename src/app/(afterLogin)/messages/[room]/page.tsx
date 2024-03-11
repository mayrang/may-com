import React from "react";
import styles from "./ChatRoomPage.module.css";
import BackButton from "../../_component/BackButton";
import { faker } from "@faker-js/faker";
import Link from "next/link";
import cls from "classnames";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { auth } from "@/auth";
import { getUser } from "../../[username]/_lib/getUser";
import { getUserServer } from "../../[username]/_lib/getUserServer";
import { QueryClient } from "@tanstack/react-query";
import UserInfo from "./_component/UserInfo";
import Chat from "./_component/Chat";

type Props = {
  params: {
    room: string;
  };
};

export default async function ChatRoomPage({ params: { room } }: Props) {
  const session = await auth();
  const me = session?.user;
  const query = new QueryClient();
  const receiverId = room.split("-").find((id) => id !== session?.user?.email);
  if (!me || !receiverId) {
    return null;
  }

  await query.prefetchQuery({ queryKey: ["users", receiverId], queryFn: getUserServer });
  return (
    <main className={styles.main}>
      <UserInfo userId={receiverId} />
      <Chat receiverId={receiverId} />
    </main>
  );
}
