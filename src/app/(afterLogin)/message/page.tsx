import React from "react";
import styles from "./MessagePage.module.css";
import { faker } from "@faker-js/faker";
import RoomChat from "./_component/RoomChat";

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
        <RoomChat />
      </div>
    </main>
  );
}
