"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Post as IPost } from "@/model/Post";
import { getPostComments } from "../../../_lib/getPostComments";
import Post from "@/app/(afterLogin)/_component/Post";
type Props = {
  postId: string;
};

export default function CommentsSection({ postId }: Props) {
  const query = useQueryClient();
  const post = query.getQueryData(["post", postId]);
  const { data } = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, _3: string]>({
    queryKey: ["post", "comments", postId],
    queryFn: getPostComments,
    staleTime: 60 * 1000,
    enabled: !!post,
  });

  return (
    <>
      {data?.map((comment) => (
        <Post key={comment.postId} post={comment} />
      ))}
    </>
  );
}
