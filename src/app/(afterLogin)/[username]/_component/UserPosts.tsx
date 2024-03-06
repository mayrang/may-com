"use client";
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { Post as IPost } from "@/model/Post";
import { getUserPosts } from "../_lib/getUserPosts";
import Post from "../../_component/Post";
import { useInView } from "react-intersection-observer";
import useInfiniteScroll from "../../home/_hook/useInfiniteScroll";
type Props = {
  username: string;
};

export default function UserPosts({ username }: Props) {
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string, username: string],
    number
  >({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
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
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div style={{ height: 50 }} ref={ref}></div>
    </>
  );
}
