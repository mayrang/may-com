"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPostRecommends } from "../_lib/getPostRecommends";
import { Post as IPost } from "@/model/Post";
import Post from "../../_component/Post";

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000,
  });
  console.log("data", data);
  if (!data) {
    return null;
  }
  return (
    <>
      {data.map((post) => (
        <Post post={post} />
      ))}
    </>
  );
}
