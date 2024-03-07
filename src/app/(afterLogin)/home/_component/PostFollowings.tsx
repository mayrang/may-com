import { InfiniteData, useInfiniteQuery, useQuery, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React, { Fragment, useEffect, useState } from "react";
import { getPostFollowings } from "../_lib/getPostFollowings";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { useInView } from "react-intersection-observer";
import useInfiniteScroll from "../_hook/useInfiniteScroll";
import { getPostFollowingsServer } from "../_lib/getPostFollowingsServer";

export default function PostFollowings() {
  const { data, isFetching, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "followings"],
    queryFn: getPostFollowings,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 6000,
  });
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useInfiniteScroll(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage]);

  if (!data || !data.pages) {
    return null;
  }
  return (
    <>
      {data.pages.map((page, idx) => (
        <Fragment key={idx}>
          {page.map((post) => (
            <Post post={post} key={post.postId} />
          ))}
        </Fragment>
      ))}
      <div style={{ height: 50 }} ref={ref}></div>
    </>
  );
}
