import React from "react";
import styles from "./ChatRoomPage.module.css";
import BackButton from "../../_component/BackButton";
import { faker } from "@faker-js/faker";
import Link from "next/link";
import cls from "classnames";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { auth } from "@/auth";

dayjs.locale("ko");

export default async function ChatRoomPage() {
  const session = await auth();
  const me = session?.user;
  if (!me) {
    return null;
  }
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <BackButton />
        <h2>{me.name}</h2>
      </div>
      <Link href={`/${me.id}`} className={styles.userInfo}>
        <img src={me.image as string} alt={me.id} />
        <div>
          <b>{me.name}</b>
        </div>
        <div>@{me.id}</div>
      </Link>
      <div className={styles.list}>
        <div style={{ height: 1, background: "yellow", marginBottom: 8 }}></div>
        <div className={cls(styles.message, true ? styles.yourMessage : styles.myMessage)}>
          <div className={styles.content}>1234</div>
          <div className={styles.date}>{dayjs(new Date()).format("YYYY년 MM월 DD일 A hh시 mm분")}</div>
        </div>
        <div className={cls(styles.message, false ? styles.yourMessage : styles.myMessage)}>
          <div className={styles.content}>56777755</div>
          <div className={styles.date}>{dayjs(new Date()).format("YYYY년 MM월 DD일 A hh시 mm분")}</div>
        </div>
        <div className={cls(styles.message, true ? styles.yourMessage : styles.myMessage)}>
          <div className={styles.content}>1234</div>
          <div className={styles.date}>{dayjs(new Date()).format("YYYY년 MM월 DD일 A hh시 mm분")}</div>
        </div>
      </div>
    </main>
  );
}
