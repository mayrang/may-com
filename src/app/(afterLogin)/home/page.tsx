import React from "react";
import styles from "./Home.module.css";
import TabProvider from "./_component/TabProvider";
import Tab from "./_component/Tab";
import PostForm from "../_component/PostForm";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getPostRecommends } from "./_lib/getPostRecommends";
import PostRecommends from "./_component/PostRecommends";
export default async function AfterHomePage() {
  const query = new QueryClient();
  await query.prefetchQuery({ queryKey: ["posts", "recommends"], queryFn: getPostRecommends });
  const dehydratedstate = dehydrate(query);
  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydratedstate}>
        <TabProvider>
          <Tab />
          <PostForm />
          <PostRecommends />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
