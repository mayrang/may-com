import React from "react";
import styles from "./MessagePage.module.css";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function MessagePage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h3>쪽지</h3>
      </div>
      <div className={styles.room}>
        <div className={styles.roomUserImage}>
          <img src={faker.image.avatar()} alt="profile image" />
        </div>
        <div className={styles.roomChatInfo}>
          <div className={styles.roomUserInfo}>
            <b>mayrang</b>
            &nbsp;
            <span>@ pgss0626</span>
            &nbsp; · &nbsp;
            <span> {dayjs(new Date()).fromNow(true)}</span>
          </div>
          <div>3333</div>
        </div>
      </div>
    </main>
  );
}
