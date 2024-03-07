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
      {post?.Original && (
        <div className={styles.postReposted}>
          <svg viewBox="0 0 24 24" width="16" aria-hidden="true" className="r-14j79pv r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz"><g><path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path></g></svg>
          <Link href={`/${target.User.id}`} onClick={clickProfile}>@{target.User.id}</Link>님의 글을 재개시했습니다.
        </div>
      )}
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
