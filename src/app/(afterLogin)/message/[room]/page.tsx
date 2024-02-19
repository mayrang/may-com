import React from "react";
import styles from "./ChatRoomPage.module.css";
import BackButton from "../../_component/BackButton";
import { faker } from "@faker-js/faker";
import Link from "next/link";
import cls from "classnames";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export default function ChatRoomPage() {
  const me = {
    id: "pagee0626",
    nickname: "메이랑",
    image: faker.image.avatar(),
  };
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <BackButton />
        <h2>{me.nickname}</h2>
      </div>
      <Link href={`/${me.id}`} className={styles.userInfo}>
        <img src={me.image} alt={me.id} />
        <div>
          <b>{me.nickname}</b>
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
