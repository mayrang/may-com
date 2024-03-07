import { cookies } from "next/headers";

export async function getPostFollowingsServer({ pageParam }: { pageParam?: number }) {
    console.log(pageParam, "following check");
    const res = await fetch(`http://localhost:9090/api/posts/followings?cursor=${pageParam}`, {
      next: {
        tags: ["posts", "followings"],
      },
      cache: "no-cache",
      headers: {
        Cookie: cookies().toString()
      }
      
    });
    console.log("res", res);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }
  