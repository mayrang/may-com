export async function getPostFollowings({ pageParam }: { pageParam?: number }) {
  console.log(pageParam, "following check");
  const res = await fetch(`http://localhost:9090/api/posts/followings?cursor=${pageParam}`, {
    next: {
      tags: ["posts", "followings"],
    },
    cache: "no-cache",
    credentials: "include",
    
  });
  console.log("res", res);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
