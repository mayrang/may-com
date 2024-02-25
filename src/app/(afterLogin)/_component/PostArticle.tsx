"use client";
import React from "react";
import styles from "./Post.module.css";
import { useRouter } from "next/navigation";
import { Post } from "@/model/Post";
type Props = {
  children: React.ReactNode;
  post: Post;
};

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();

  const onClickPost = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };
  return (
    <article className={styles.post} onClickCapture={onClickPost}>
      {children}
    </article>
  );
}
