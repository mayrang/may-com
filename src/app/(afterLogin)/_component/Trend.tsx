import Link from "next/link";
import React from "react";
import styles from "./Trend.module.css";
export default function Trend() {
  return (
    <Link href={`/search?q=${"메이랑"}`} className={styles.container}>
      <div className={styles.count}>실시간트렌드</div>
      <div className={styles.title}>#메이랑</div>
      <div className={styles.count}>{2} posts</div>
    </Link>
  );
}
