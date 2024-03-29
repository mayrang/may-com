"use client"
import React, { MouseEventHandler } from "react";
import styles from "./Post.module.css";
import Link from "next/link";
import cls from "classnames";
export default function PostImages({ post }: any) {
  const clickImage:MouseEventHandler= (e) => {
    e.stopPropagation()
  }
  if (!post?.Images) return null;
  if (post.Images.length === 0) return null;
  if (post.Images.length === 1) {
    return (
      <div>
        <Link
        onClick={clickImage}
          className={cls(styles.postImageSection, styles.oneImage)}
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{ backgroundImage: `url("${post.Images[0].link}")`, backgroundSize: "contain" }}
        >
          <img
            src={`${post.Images[0].link}`}
            style={{ height: "auto", objectFit: "cover", width: "100%" }}
            alt="content image"
          />
        </Link>
      </div>
    );
  }
  if (post.Images.length === 2) {
    return (
      <div className={cls(styles.postImageSection, styles.twoImage)}>
        <Link
          onClick={clickImage}
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{ backgroundImage: `url("${post.Images[0].link}")`, backgroundSize: "cover" }}
        ></Link>
        <Link
          onClick={clickImage}
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
          style={{ backgroundImage: `url("${post.Images[1].link}")`, backgroundSize: "cover" }}
        ></Link>
      </div>
    );
  }
  if (post.Images.length === 3) {
    return (
      <div className={cls(styles.postImageSection, styles.threeImage)}>
        <Link
          onClick={clickImage}
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{ backgroundImage: `url("${post.Images[0].link}")`, backgroundSize: "cover" }}
        ></Link>
        <div>
          <Link
            onClick={clickImage}
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
            style={{ backgroundImage: `url("${post.Images[1].link}")`, backgroundSize: "cover" }}
          ></Link>
          <Link
            onClick={clickImage}
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
            style={{ backgroundImage: `url("${post.Images[2].link}")`, backgroundSize: "cover" }}
          ></Link>
        </div>
      </div>
    );
  }
  if (post.Images.length === 4) {
    return (
      <div className={cls(styles.postImageSection, styles.fourImage)}>
        <Link
          onClick={clickImage}
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{ backgroundImage: `url("${post.Images[0].link}")`, backgroundSize: "cover" }}
        ></Link>
        <Link
          onClick={clickImage}
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
          style={{ backgroundImage: `url("${post.Images[1].link}")`, backgroundSize: "cover" }}
        ></Link>
        <Link
          onClick={clickImage}
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
          style={{ backgroundImage: `url("${post.Images[2].link}")`, backgroundSize: "cover" }}
        ></Link>
        <Link
          onClick={clickImage}
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[3].imageId}`}
          style={{ backgroundImage: `url("${post.Images[3].link}")`, backgroundSize: "cover" }}
        ></Link>
      </div>
    );
  }

  return null;
}
