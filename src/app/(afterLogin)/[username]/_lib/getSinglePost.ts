import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getSinglePost: QueryFunction<Post, [_1: string, _2: string]> = async ({ queryKey }) => {
  const [_1, postId] = queryKey;
  const res = await fetch(`http://localhost:9090/api/posts/${postId}`, {
    next: {
      tags: ["posts", postId],
    },
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
