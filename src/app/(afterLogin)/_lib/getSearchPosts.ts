import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/query-core";

export const getSearchPosts: QueryFunction<
  Post[],
  [_1: string, _2: string, searchParams: { q: string; pf?: string; f?: string }],
  number
> = async ({ queryKey, pageParam }) => {
  const [_1, _2, searchParams] = queryKey;
  const newSearchParams = new URLSearchParams(searchParams);
  const res = await fetch(
    `http://localhost:9090/api/search/${encodeURIComponent(newSearchParams.get("q") as string)}?curcor=${pageParam}`,
    {
      next: {
        tags: ["posts", "search", searchParams.q],
      },
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
