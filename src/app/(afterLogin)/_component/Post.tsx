import React from "react";
import styles from "./Post.module.css";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import cls from "classnames";
import PostArticle from "./PostArticle";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function Post() {
  const commented = true;
  const reposted = true;
  const liked = true;
  const post = {
    postId: 1,
    content: "안뇽갑!",
    User: {
      id: "pgss0626",
      nickname: "메이랑",
      image: "/5Udwvqim.jpg",
    },
    createdAt: new Date(),
    Images: ["/skiyaki.jpg"],
  };

  return (
    <PostArticle post={post}>
      <div className={styles.postWrapper}>
        <div className={styles.postUserSection}>
          <Link href={`/${post.User.id}`} className={styles.postUserImage}>
            <Image src={post.User.image} alt={post.User.nickname} width={40} height={40} />
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
          <div>
            <Link
              className={`${styles.postImageSection} ${styles.oneImage}`}
              href={`/${post.User.id}`}
              style={{ backgroundImage: `url("${post.Images.at(-1)}")`, backgroundSize: "contain" }}
            >
              <Image
                src={`${post.Images.at(-1)}`}
                width={520}
                height={580}
                style={{ height: "auto", objectFit: "cover", width: "100%" }}
                alt="content image"
              />
            </Link>
          </div>
          <div className={styles.actionButtons}>
            <div className={cls(styles.commentButton, commented && styles.commented)}>
              <button>
                <svg width="24" viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                  </g>
                </svg>
              </button>
              <div className={styles.count}>27</div>
            </div>
            <div className={cls(styles.repostButton, reposted && styles.reposeted)}>
              <button>
                <svg width="24" viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                  </g>
                </svg>
              </button>
              <div className={styles.count}>20</div>
            </div>
            <div className={cls(styles.heartButton, liked && styles.liked)}>
              <button>
                <svg width="24" viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                  </g>
                </svg>
              </button>
              <div className={styles.count}>35</div>
            </div>
          </div>
        </div>
      </div>
    </PostArticle>
  );
}
