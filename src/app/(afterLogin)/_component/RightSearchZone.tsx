"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEventHandler, useEffect, useRef } from "react";
import SearchForm from "./SearchForm";
import TrendSection from "./TrendSection";
import styles from "./RightSearchZone.module.css";
export default function RightSearchZone() {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const allInputRef = useRef<null | HTMLInputElement>(null);
  const pfInputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (searchParams.has("pf", "live")) {
      if (allInputRef.current && pfInputRef.current) {
        allInputRef.current.checked = false;
        pfInputRef.current.checked = true;
      }
    }
  }, []);

  const clickFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.name === "all") {
      newSearchParams.delete("pf");
      if (pfInputRef.current) {
        pfInputRef.current.checked = false;
      }
    } else if ("pf") {
      newSearchParams.set("pf", "live");
      if (allInputRef.current) {
        allInputRef.current.checked = false;
      }
    }
    router.push(`/search?${newSearchParams.toString()}`);
    return null;
    // router.push(`/search?${}`)
  };
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
                <input type="radio" name="all" ref={allInputRef} defaultChecked onChange={clickFilter} />
              </div>
              <div className={styles.radio}>
                <div>내가 팔로우하는 사람들</div>
                <input type="radio" name="pf" ref={pfInputRef} onChange={clickFilter} />
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
