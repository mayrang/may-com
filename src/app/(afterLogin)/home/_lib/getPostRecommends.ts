export async function getPostRecommends({ pageParam }: { pageParam?: number }) {
  console.log(pageParam, "recommends");
  const res = await fetch(`http://localhost:9090/api/posts/recommends?cursor=${pageParam}`, {
    next: {
      tags: ["posts", "recommends"],
    },
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
