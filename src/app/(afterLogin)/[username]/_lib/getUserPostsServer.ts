import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";
import { cookies } from "next/headers";

export const getUserPostsServer: QueryFunction<Post[], [_1: string, _2: string, username: string], number> = async ({
  queryKey,
  pageParam,
}) => {
  const [_1, _2, username] = queryKey;
  const res = await fetch(`http://localhost:9090/api/users/${username}/posts?cursor=${pageParam}`, {
    next: {
      tags: ["posts", "users", username],
    },
    cache: "no-cache",
    headers: {
      Cookie: cookies().toString()
    }
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
