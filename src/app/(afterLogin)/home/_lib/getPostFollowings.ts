export async function getPostFollowings() {
  const res = await fetch("http://localhost:9090/api/followingPosts", {
    next: {
      tags: ["posts", "followings"],
    },
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
