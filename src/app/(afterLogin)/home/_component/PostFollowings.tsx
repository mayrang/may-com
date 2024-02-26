"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPostFollowings } from "../_lib/getPostFollowings";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
export default function PostFollowings() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "followings"],
    queryFn: getPostFollowings,

    gcTime: 10 * 60 * 6000,
  });
  if (!data) {
    return null;
  }
  return (
    <>
      {data.map((post) => (
        <Post post={post} key={post.postId} />
      ))}
    </>
  );
}
