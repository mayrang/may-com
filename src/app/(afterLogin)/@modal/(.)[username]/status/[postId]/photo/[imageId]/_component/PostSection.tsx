"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Post as IPost } from "@/model/Post";
import { getSinglePost } from "@/app/(afterLogin)/[username]/_lib/getSinglePost";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/_component/CommentForm";
import CommentsSection from "@/app/(afterLogin)/[username]/status/[postId]/_component/CommentsSection";
type Props = {
  postId: string;
};

export default function PostSection({ postId }: Props) {
  const { data: post, error } = useQuery<IPost, Object, IPost, [_1: string, _2: string]>({
    queryKey: ["post", postId],
    queryFn: getSinglePost,
  });

  if (error) {
    return (
      <div
        style={{
          height: 100,
          alignItems: "center",
          fontSize: 31,
          fontWeight: "bold",
          justifyContent: "center",
          display: "flex",
        }}
      >
        이 포스트를 찾을 수 없습니다.
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <Post showImage={false} post={post} />
      <CommentForm postId={postId} />
      <CommentsSection postId={postId} />
    </>
  );
}
