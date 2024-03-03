import React from "react";

import { getPostRecommends } from "../_lib/getPostRecommends";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import TabSection from "./TabSection";
export default async function TabSectionSuspense() {
  const query = new QueryClient();
  await query.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0,
  });
  const dehydratedstate = dehydrate(query);
  return (
    <HydrationBoundary state={dehydratedstate}>
      <TabSection />
    </HydrationBoundary>
  );
}
