"use client";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import React, { Fragment, useEffect, useState } from "react";
import { getPostRecommends } from "../_lib/getPostRecommends";
import { Post as IPost } from "@/model/Post";
import Post from "../../_component/Post";
import { useInView } from "react-intersection-observer";
import useInfiniteScroll from "../_hook/useInfiniteScroll";

export default function PostRecommends() {
  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
  });

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useInfiniteScroll(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage]);

  if (!data || !data?.pages) {
    return null;
  }
  return (
    <>
      {data?.pages.map((page, idx) => (
        <Fragment key={idx}>
          {page.map((post) => (
            <Post post={post} key={post.postId} />
          ))}
        </Fragment>
      ))}
      <div style={{ height: 150 }} ref={ref}></div>
    </>
  );
}
