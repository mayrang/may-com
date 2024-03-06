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
import { getUserServer } from "./_lib/getUserServer";
import { getUserPostsServer } from "./_lib/getUserPostsServer";
import { User } from "@/model/User";

type Props = {
  params: { username: string };
};

export async function generateMetadata({params}: Props){
  const user:User = await getUserServer({queryKey: ["users", params.username]})
  return {
    title: `${user.nickname} (${user.id}) / May`,
    description: `${user.nickname} (${user.id}) 프로필입니다.`
  }
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = params;
  const query = new QueryClient();
  await query.prefetchQuery({ queryKey: ["users", username], queryFn: getUserServer });
  await query.prefetchInfiniteQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPostsServer,
    initialPageParam: 0,
  });
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
