"use client";
import { usePathname } from "next/navigation";
import React from "react";
import SearchForm from "./SearchForm";
import TrendSection from "./TrendSection";
import styles from "./RightSearchZone.module.css";
export default function RightSearchZone() {
  const path = usePathname();
  if (path === "/explore") {
    return null;
  }
  if (path === "/search") {
    return (
      <>
        <div>
          <h5 className={styles.filterTitle}>검색 필터</h5>
          <div className={styles.filterSection}>
            <div>
              <label>사용자</label>
              <div className={styles.radio}>
                <div>모든 사용자</div>
                <input type="radio" name="pf" />
              </div>
              <div className={styles.radio}>
                <div>내가 팔로우하는 사람들</div>
                <input type="radio" name="pf" />
              </div>
            </div>
          </div>
        </div>
        <TrendSection />
      </>
    );
  }
  return (
    <>
      <SearchForm />
      <TrendSection />
    </>
  );
}
