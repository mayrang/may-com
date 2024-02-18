"use client";
import React from "react";
import styles from "./Post.module.css";
import { useRouter } from "next/navigation";
type Props = {
  children: React.ReactNode;
  post: {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: any[];
  };
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
