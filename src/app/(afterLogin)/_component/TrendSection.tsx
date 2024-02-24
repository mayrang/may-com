import React from "react";
import styles from "./TrendSection.module.css";
import Trend from "./Trend";
import { auth } from "@/auth";
export default async function TrendSection() {
  // const session = await auth();
  // if (!session?.user) {
  //   return (
  //     <div className={styles.trendBg}>
  //       <div className={styles.trend}>트렌드는 몰루</div>
  //     </div>
  //   );
  // }
  return (
    <div className={styles.trendBg}>
      <div className={styles.trend}>
        <h3>나를 위한 트렌드</h3>
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    </div>
  );
}
