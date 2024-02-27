"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Post as IPost } from "@/model/Post";
import { getUserPosts } from "../_lib/getUserPosts";
import Post from "../../_component/Post";
type Props = {
  username: string;
};

export default function UserPosts({ username }: Props) {
  const { data } = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, username: string]>({
    queryKey: ["users", "posts", username],
    queryFn: getUserPosts,
  });

  return (
    <div>
      {data?.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </div>
  );
}
