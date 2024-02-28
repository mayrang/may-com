"use client";
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { Post as IPost } from "@/model/Post";
import Post from "./Post";
import { getSearchPosts } from "../_lib/getSearchPosts";
import { useInView } from "react-intersection-observer";
import useInfiniteScroll from "../home/_hook/useInfiniteScroll";
type Props = {
  searchParams: {
    q: string;
    pf?: string;
    f?: string;
  };
};

export default function SearchListSection({ searchParams }: Props) {
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string, Props["searchParams"]],
    number
  >({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    initialPageParam: 0,
  });

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useInfiniteScroll(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [isFetching, hasNextPage, fetchNextPage, inView]);

  return (
    <>
      {data?.pages.map((page, idx) => (
        <Fragment key={idx}>
          {page.map((post) => (
            <Post post={post} key={post.postId} />
          ))}
        </Fragment>
      ))}
    </>
  );
}
