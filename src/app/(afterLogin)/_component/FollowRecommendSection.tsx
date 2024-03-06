"use client";
import React from "react";
import styles from "@/app/(afterLogin)/layout.module.css";
import { useQuery } from "@tanstack/react-query";
import { getFollowRecommends } from "../_lib/getFollowRecommends";
import { User } from "@/model/User";
import FollowRecommend from "./FollowRecommend";
export default function FollowRecommendSection() {
  const { data } = useQuery<User[]>({ queryKey: ["users", "followRecommends"], queryFn: getFollowRecommends });
  if (!data) {
    return null;
  }

  return (
    <div className={styles.followRecommend}>
      <h3>팔로우 추천</h3>
      {data.map((user) => (
        <FollowRecommend user={user} key={user.id} />
      ))}
    </div>
  );
}
