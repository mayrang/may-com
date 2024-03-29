import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getPostComments: QueryFunction<Post[], [_1: string, _2: string, _3: string], number> = async ({
  queryKey,
  pageParam,
}) => {
  const [_1, _2, postId] = queryKey;
  console.log(postId, pageParam, "check");
  const res = await fetch(`http://localhost:9090/api/posts/${postId}/comments?cursor=${pageParam || "0"}`, {
    next: {
      tags: ["posts", "comments", postId],
    },
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
