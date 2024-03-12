import React from "react";
import styles from "./MessagePage.module.css";
import { faker } from "@faker-js/faker";
import RoomChat from "./_component/RoomChat";
import { Metadata } from "next";
import { auth } from "@/auth";
import { getRoomsServer } from "./_lib/getRoomsServer";
import { Room } from "@/model/Room";

export const metadata: Metadata = {
  title: "쪽지 / May",
  description: "쪽지",
};

export default async function MessagePage() {
  const session = await auth();
  const rooms = session?.user?.email ? await getRoomsServer(session.user.email) : [];
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h3>쪽지</h3>
      </div>
     
        {rooms.map((room: Room) => (
          <RoomChat room={room} />
        ))}

    </main>
  );
}
