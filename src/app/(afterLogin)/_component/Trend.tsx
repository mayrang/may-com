import Link from "next/link";
import React from "react";
import styles from "./Trend.module.css";
import { Hashtag } from "@/model/Hashtag";

type Props = {
  hashtag: Hashtag;
};

export default function Trend({ hashtag }: Props) {
  return (
    <Link href={`/search?q=${hashtag.title}`} className={styles.container}>
      <div className={styles.count}>실시간트렌드</div>
      <div className={styles.title}>{hashtag.title}</div>
      <div className={styles.count}>{hashtag.count} posts</div>
    </Link>
  );
}
