import React, { Suspense } from "react";
import styles from "./Home.module.css";
import TabProvider from "./_component/TabProvider";
import Tab from "./_component/Tab";
import PostForm from "../_component/PostForm";
import Loading from "./loading";
import TabSectionSuspense from "./_component/TabSectionSuspense";
export default async function AfterHomePage() {
  return (
    <main className={styles.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        <Suspense fallback={<Loading />}>
          <TabSectionSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
