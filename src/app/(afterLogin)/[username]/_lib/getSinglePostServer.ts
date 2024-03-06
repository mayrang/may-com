import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";
import { cookies } from "next/headers";

export const getSinglePostServer = async ({ queryKey }: {queryKey: [string, string]}) => {
  const [_1, postId] = queryKey;
  const res = await fetch(`http://localhost:9090/api/posts/${postId}`, {
    next: {
      tags: ["posts", postId],
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
