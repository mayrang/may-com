"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getSinglePost } from "../../../_lib/getSinglePost";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";

type Props = {
  postId: string;
};

export default function SinglePostSection({ postId }: Props) {
  const { data, error } = useQuery<IPost, Object, IPost, [_1: string, _2: string]>({
    queryKey: ["posts", postId],
    queryFn: getSinglePost,
  });

  if (error) {
    return (
      <div
        style={{
          height: 100,
          alignItems: "center",
          fontSize: 31,
          fontWeight: "bold",
          justifyContent: "center",
          display: "flex",
        }}
      >
        이 포스트를 찾을 수 없습니다.
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return <Post post={data as IPost} />;
}
