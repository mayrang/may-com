"use client";
import React from "react";
import styles from "./Chat.module.css";
import cls from "classnames";
import dayjs from "dayjs";
import ChatForm from "./ChatForm";

dayjs.locale("ko");

type Props = {
  receiverId: string;
};

export default function Chat({ receiverId }: Props) {
  return (
    <>
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
      <ChatForm receiverId={receiverId} />
    </>
  );
}
