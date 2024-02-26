"use client";
import React from "react";
import styles from "./TrendSection.module.css";
import Trend from "./Trend";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "../_lib/getTrends";
import { Hashtag } from "@/model/Hashtag";

export default function TrendSection() {
  const { data: session } = useSession();
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 180 * 1000,
    enabled: !!session?.user,
  });
  if (!session?.user) {
    return (
      <div className={styles.trendBg}>
        <div className={styles.trend}>트렌드는 몰루</div>
      </div>
    );
  }
  return (
    <div className={styles.trendBg}>
      <div className={styles.trend}>
        <h3>나를 위한 트렌드</h3>
        {data?.map((hashtag) => (
          <Trend hashtag={hashtag} key={hashtag.tagId} />
        ))}
      </div>
    </div>
  );
}
