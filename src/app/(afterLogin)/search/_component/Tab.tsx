"use client";
import React, { useState } from "react";
import styles from "./Tab.module.css";
import { useRouter, useSearchParams } from "next/navigation";
export default function Tab() {
  const [current, setCurrent] = useState("hot");
  const router = useRouter();
  const searchParams = useSearchParams();
  const onClickHot = () => {
    setCurrent("hot");
    router.replace(`/search?q=${searchParams.get("q")}`);
  };
  const onClickNew = () => {
    setCurrent("new");
    router.replace(`/search?${searchParams.toString()}&f=live`);
  };

  return (
    <div className={styles.homeTab}>
      <div onClick={onClickHot}>
        인기
        {current === "hot" && <div className={styles.tabIndicator}></div>}
      </div>
      <div onClick={onClickNew}>
        최신
        {current === "new" && <div className={styles.tabIndicator}></div>}
      </div>
    </div>
  );
}
