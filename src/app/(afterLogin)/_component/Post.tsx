import React from "react";
import styles from "./Post.module.css";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import PostArticle from "./PostArticle";
import { faker } from "@faker-js/faker";
import ActionButtons from "./ActionButtons";
dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  showImage?: boolean;
};

export default function Post({ showImage = true }: Props) {
  const post = {
    postId: 1,
    content: "안뇽갑!",
    User: {
      id: "pgss0626",
      nickname: "메이랑",
      image: faker.image.avatar(),
    },
    createdAt: new Date(),
    Images: [faker.image.url()],
    imageId: 1,
  };

  return (
    <PostArticle post={post}>
      <div className={styles.postWrapper}>
        <div className={styles.postUserSection}>
          <Link href={`/${post.User.id}`} className={styles.postUserImage}>
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
          {showImage && (
            <div>
              <Link
                className={`${styles.postImageSection} ${styles.oneImage}`}
                href={`/${post.User.id}/status/${post.postId}/photo/${post.imageId}`}
                style={{ backgroundImage: `url("${post.Images.at(-1)}")`, backgroundSize: "contain" }}
              >
                <img
                  src={`${post.Images.at(-1)}`}
                  style={{ height: "auto", objectFit: "cover", width: "100%" }}
                  alt="content image"
                />
              </Link>
            </div>
          )}
          <ActionButtons white={false} />
        </div>
      </div>
    </PostArticle>
  );
}
