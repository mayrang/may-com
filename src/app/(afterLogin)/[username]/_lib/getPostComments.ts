import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getPostComments: QueryFunction<Post[], [_1: string, _2: string, _3: string]> = async ({ queryKey }) => {
  const [_1, _2, postId] = queryKey;
  const res = await fetch(`http://localhost:9090/api/posts/${postId}/comments`, {
    next: {
      tags: ["post", "comments", postId],
    },
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
