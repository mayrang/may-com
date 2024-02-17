import React from "react";
import styles from "./SearchPage.module.css";
import SearchForm from "../_component/SearchForm";
import Tab from "./_component/Tab";
type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export default function SearchPage({ searchParams }: Props) {
  return (
    <main className={styles.main}>
      <div className={styles.searchTop}>
        <div className={styles.searchZone}>
          <div className={styles.buttonZone}>
            <button className={styles.backButton}>
              <svg
                width="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
              >
                <g>
                  <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                </g>
              </svg>
            </button>
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
