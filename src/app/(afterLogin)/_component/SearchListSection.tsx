"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Post as IPost } from "@/model/Post";
import Post from "./Post";
import { getSearchPosts } from "../_lib/getSearchPosts";
type Props = {
  searchParams: {
    q: string;
    pf?: string;
    f?: string;
  };
};

export default function SearchListSection({ searchParams }: Props) {
  const { data } = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, Props["searchParams"]]>({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  console.log(data, "data");
  return (
    <>
      {data?.map((post) => (
        <Post post={post} key={post.postId} />
      ))}
    </>
  );
}
