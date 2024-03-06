import React from "react";
import styles from "./Explore.module.css";
import SearchForm from "../_component/SearchForm";
import TrendSection from "./_component/TrendSection";
import { Metadata } from "next";

const metadata:Metadata = {
  title: "탐색하기 / May",
  description: "탐색하기"
}

export default function ExplorePage() {
  return (
    <main className={styles.main}>
      <div className={styles.formZone}>
        <SearchForm />
      </div>
      <div className={styles.trendZone}>
        <TrendSection />
      </div>
    </main>
  );
}
