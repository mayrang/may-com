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
  let target = post;
  if(post.Original){
    target = post.Original
  }

  const clickProfile:MouseEventHandler = (e) => {
    e.stopPropagation();

  }

  return (
    <PostArticle post={target}>
      <div className={styles.postWrapper}>
        <div className={styles.postUserSection}>
          <Link href={`/${target.User.id}`} className={styles.postUserImage} onClick={clickProfile}>
            <img src={target.User.image} alt={target.User.nickname} width={40} height={40} />
            <div className={styles.postShade}></div>
          </Link>
        </div>
        <div className={styles.postBody}>
          <div className={styles.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={styles.postUserName}>{target.User.nickname}</span>&nbsp;<span>@{target.User.id}</span>
              &nbsp;·&nbsp;
            </Link>
            <span className={styles.postDate}>{dayjs(target.createdAt).fromNow(true)}</span>
          </div>
          <div>{target.content}</div>
          {showImage && <PostImages post={target} />}
          <ActionButtons white={false} post={target} />
        </div>
      </div>
    </PostArticle>
  );
}
