import React from "react";
import styles from "./Home.module.css";
import TabProvider from "./_component/TabProvider";
import Tab from "./_component/Tab";
import PostForm from "../_component/PostForm";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getPostRecommends } from "./_lib/getPostRecommends";
import PostRecommends from "./_component/PostRecommends";
import TabSection from "./_component/TabSection";
export default async function AfterHomePage() {
  const query = new QueryClient();
  await query.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0,
  });
  const dehydratedstate = dehydrate(query);
  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydratedstate}>
        <TabProvider>
          <Tab />
          <PostForm />
          <TabSection />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
