import React, { Suspense } from "react";
import styles from "./Home.module.css";
import TabProvider from "./_component/TabProvider";
import Tab from "./_component/Tab";
import PostForm from "../_component/PostForm";
import Loading from "./loading";
import TabSectionSuspense from "./_component/TabSectionSuspense";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "홈 / May",
  description: "홈"
}
export default async function AfterHomePage() {
  const session = await auth();
  console.log("session page", session);
  return (
    <main className={styles.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <Suspense fallback={<Loading />}>
          <TabSectionSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
