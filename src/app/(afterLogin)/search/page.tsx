import React from "react";
import styles from "./SearchPage.module.css";
import SearchForm from "../_component/SearchForm";
import Tab from "./_component/Tab";
import BackButton from "../_component/BackButton";
type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export default function SearchPage({ searchParams }: Props) {
  return (
    <main className={styles.main}>
      <div className={styles.searchTop}>
        <div className={styles.searchZone}>
          <div className={styles.buttonZone}>
            <BackButton />
          </div>
          <div className={styles.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <div className={styles.homeFixed}>
          <Tab />
        </div>
      </div>
    </main>
  );
}
