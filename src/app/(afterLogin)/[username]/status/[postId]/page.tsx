import React from "react";
import styles from "./SinglePostPage.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/_component/CommentForm";

type Props = {
  params: {
    username: string;
    postId: string;
  };
};

export default function SinglePostPage({ params }: Props) {
  console.log(params.postId, params.username);
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <BackButton />
        <h3 className={styles.headerTitle}>게시하기</h3>
      </div>

      <CommentForm />
      <div></div>
    </div>
  );
}
