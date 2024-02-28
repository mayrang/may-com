import React from "react";
import styles from "./PhotoModal.module.css";
import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getSinglePost } from "@/app/(afterLogin)/[username]/_lib/getSinglePost";
import { getPostComments } from "@/app/(afterLogin)/[username]/_lib/getPostComments";
import ImageSection from "./_component/ImageSection";
import PostSection from "./_component/PostSection";

type Props = {
  params: {
    postId: string;
    imageId: string;
  };
};

export default async function PhotoModal({ params }: Props) {
  const query = new QueryClient();
  const { postId, imageId } = params;
  await query.prefetchQuery({ queryKey: ["post", postId], queryFn: getSinglePost });
  await query.prefetchInfiniteQuery({
    queryKey: ["post", "comments", postId],
    queryFn: getPostComments,
    initialPageParam: 0,
  });
  const dehydratedstate = dehydrate(query);
  return (
    <div className={styles.container}>
      <HydrationBoundary state={dehydratedstate}>
        <PhotoModalCloseButton />
        <ImageSection postId={postId} imageId={imageId} />
        <div className={styles.commentZone}>
          <PostSection postId={postId} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
