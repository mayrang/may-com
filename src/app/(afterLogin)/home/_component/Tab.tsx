"use client";
import React, { useContext } from "react";
import styles from "./Tab.module.css";
import { TabContext } from "./TabProvider";
export default function Tab() {
  const { tab, setTab } = useContext(TabContext);
  const handleChangeTab = (value: "rec" | "fol") => {
    setTab(value);
  };
  console.log("tab", tab);
  return (
    <div className={styles.homeFixed}>
      <div className={styles.homeText}>홈</div>
      <div className={styles.homeTab}>
        <div onClick={() => handleChangeTab("rec")}>
          추천
          <div className={styles.tabIndicator} hidden={tab === "fol"}></div>
        </div>

        <div onClick={() => handleChangeTab("fol")}>
          팔로우 중<div className={styles.tabIndicator} hidden={tab === "rec"}></div>
        </div>
      </div>
    </div>
  );
}
