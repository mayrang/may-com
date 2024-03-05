import React from "react";
import styles from "./SinglePostPage.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/_component/CommentForm";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getSinglePost } from "../../_lib/getSinglePost";
import SinglePostSection from "./_component/SinglePostSection";
import CommentsSection from "./_component/CommentsSection";
import { getPostComments } from "../../_lib/getPostComments";

type Props = {
  params: {
    username: string;
    postId: string;
  };
};

export default async function SinglePostPage({ params }: Props) {
  const { postId } = params;
  const query = new QueryClient();
  await query.prefetchQuery({ queryKey: ["posts", postId], queryFn: getSinglePost });
  await query.prefetchInfiniteQuery({
    queryKey: ["posts", "comments", postId],
    queryFn: getPostComments,
    initialPageParam: 0,
  });
  const dehydratedstate = dehydrate(query);
  console.log(params.postId, params.username);
  return (
    <div className={styles.main}>
      <HydrationBoundary state={dehydratedstate}>
        <div className={styles.header}>
          <BackButton />
          <h3 className={styles.headerTitle}>게시하기</h3>
        </div>
        <SinglePostSection postId={postId} />
        <CommentForm postId={postId} />
        <div className={styles.commentZone}>
          <CommentsSection postId={postId} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
