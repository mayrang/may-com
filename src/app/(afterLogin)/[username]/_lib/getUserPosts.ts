import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getUserPosts: QueryFunction<Post[], [_1: string, _2: string, username: string], number> = async ({
  queryKey,
  pageParam,
}) => {
  const [_1, _2, username] = queryKey;
  const res = await fetch(`http://localhost:9090/api/users/${username}/posts?curcor=${pageParam}`, {
    next: {
      tags: ["users", "posts", username],
    },
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
