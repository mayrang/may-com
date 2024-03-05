"use client";
import { InfiniteData, useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { Post as IPost } from "@/model/Post";
import { getPostComments } from "../../../_lib/getPostComments";
import Post from "@/app/(afterLogin)/_component/Post";
import { useInView } from "react-intersection-observer";
import useInfiniteScroll from "@/app/(afterLogin)/home/_hook/useInfiniteScroll";
type Props = {
  postId: string;
};

export default function CommentsSection({ postId }: Props) {
  const query = useQueryClient();
  const post = query.getQueryData(["post", postId]);
  console.log(postId);
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string, _3: string],
    number
  >({
    queryKey: ["posts", "comments", postId],
    queryFn: getPostComments,
    staleTime: 60 * 1000,
    enabled: !!post,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
  });
  // const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery<
  //   IPost[],
  //   Object,
  //   InfiniteData<IPost[]>,
  //   [_1: string, _2: string],
  //   number
  // >({
  //   queryKey: ["posts", "followings"],
  //   queryFn: getPostFollowings,
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
  //   staleTime: 60 * 1000,
  //   gcTime: 10 * 60 * 6000,
  // });
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useInfiniteScroll(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage]);

  return (
    <>
      {data?.pages.map((page, idx) => (
        <Fragment key={idx}>
          {page.map((comment) => (
            <Post key={comment.postId} post={comment} />
          ))}
        </Fragment>
      ))}
      <div style={{ height: 50 }} ref={ref}></div>
    </>
  );
}
