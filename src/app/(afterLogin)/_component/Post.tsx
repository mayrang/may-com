"use client"
import React, { MouseEventHandler } from "react";
import styles from "./Post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import PostArticle from "./PostArticle";
import ActionButtons from "./ActionButtons";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";
dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  showImage?: boolean;
  post: Post;
};

export default function Post({ showImage = true, post }: Props) {
  const clickProfile:MouseEventHandler = (e) => {
    e.stopPropagation();

  }

  return (
    <PostArticle post={post}>
      <div className={styles.postWrapper}>
        <div className={styles.postUserSection}>
          <Link href={`/${post.User.id}`} className={styles.postUserImage} onClick={clickProfile}>
            <img src={post.User.image} alt={post.User.nickname} width={40} height={40} />
            <div className={styles.postShade}></div>
          </Link>
        </div>
        <div className={styles.postBody}>
          <div className={styles.postMeta}>
            <Link href={`/${post.User.id}`}>
              <span className={styles.postUserName}>{post.User.nickname}</span>&nbsp;<span>@{post.User.id}</span>
              &nbsp;·&nbsp;
            </Link>
            <span className={styles.postDate}>{dayjs(post.createdAt).fromNow(true)}</span>
          </div>
          <div>{post.content}</div>
          {showImage && <PostImages post={post} />}
          <ActionButtons white={false} post={post} />
        </div>
      </div>
    </PostArticle>
  );
}
