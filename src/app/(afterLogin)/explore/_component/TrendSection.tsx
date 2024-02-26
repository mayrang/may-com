"use client";
import React from "react";
import styles from "./TrendSection.module.css";
import { Hashtag } from "@/model/Hashtag";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "../../_lib/getTrends";
import Trend from "../../_component/Trend";
export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 180 * 1000,
  });
  return (
    <div className={styles.trend}>
      <h3>나를 위한 트렌드</h3>
      {data?.map((hashtag) => (
        <Trend hashtag={hashtag} key={hashtag.tagId} />
      ))}
    </div>
  );
}
