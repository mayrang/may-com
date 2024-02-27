import React from "react";
import styles from "./ProfilePage.module.css";
import Image from "next/image";
import Post from "../_component/Post";
import BackButton from "../_component/BackButton";
import FollowButton from "../_component/FollowButton";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getUser } from "./_lib/getUser";
import { getUserPosts } from "./_lib/getUserPosts";
import UserInfo from "./_component/UserInfo";
import UserPosts from "./_component/UserPosts";

type Props = {
  params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {
  const { username } = params;
  const query = new QueryClient();
  await query.prefetchQuery({ queryKey: ["users", username], queryFn: getUser });
  await query.prefetchQuery({ queryKey: ["users", "posts", username], queryFn: getUserPosts });
  const dehydratedstate = dehydrate(query);
  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydratedstate}>
        <UserInfo username={username} />
        <UserPosts username={username} />
      </HydrationBoundary>
    </main>
  );
}
