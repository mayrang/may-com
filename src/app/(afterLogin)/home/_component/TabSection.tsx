"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { TabContext } from "./TabProvider";
import PostRecommends from "./PostRecommends";
import PostFollowings from "./PostFollowings";

export default function TabSection() {
  const { tab } = useContext(TabContext);

  return <>{tab === "rec" ? <PostRecommends /> : <PostFollowings />}</>;
}
