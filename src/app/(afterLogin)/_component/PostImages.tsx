import React from "react";
import styles from "./Post.module.css";
import Link from "next/link";
import cls from "classnames";
export default function PostImages({ post }: any) {
  console.log(`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`);
  if (!post?.Images) return null;
  if (post.Images.length === 0) return null;
  if (post.Images.length === 1) {
    return (
      <div>
        <Link
          className={cls(styles.postImageSection, styles.oneImage)}
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{ backgroundImage: `url("${post.Images[0].imageUrl}")`, backgroundSize: "contain" }}
        >
          <img
            src={`${post.Images[0].imageUrl}`}
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
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{ backgroundImage: `url("${post.Images[0].imageUrl}")`, backgroundSize: "cover" }}
        ></Link>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
          style={{ backgroundImage: `url("${post.Images[1].imageUrl}")`, backgroundSize: "cover" }}
        ></Link>
      </div>
    );
  }
  if (post.Images.length === 3) {
    return (
      <div className={cls(styles.postImageSection, styles.threeImage)}>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{ backgroundImage: `url("${post.Images[0].imageUrl}")`, backgroundSize: "cover" }}
        ></Link>
        <div>
          <Link
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
            style={{ backgroundImage: `url("${post.Images[1].imageUrl}")`, backgroundSize: "cover" }}
          ></Link>
          <Link
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
            style={{ backgroundImage: `url("${post.Images[2].imageUrl}")`, backgroundSize: "cover" }}
          ></Link>
        </div>
      </div>
    );
  }
  if (post.Images.length === 4) {
    return (
      <div className={cls(styles.postImageSection, styles.fourImage)}>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{ backgroundImage: `url("${post.Images[0].imageUrl}")`, backgroundSize: "cover" }}
        ></Link>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
          style={{ backgroundImage: `url("${post.Images[1].imageUrl}")`, backgroundSize: "cover" }}
        ></Link>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
          style={{ backgroundImage: `url("${post.Images[2].imageUrl}")`, backgroundSize: "cover" }}
        ></Link>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[3].imageId}`}
          style={{ backgroundImage: `url("${post.Images[3].imageUrl}")`, backgroundSize: "cover" }}
        ></Link>
      </div>
    );
  }

  return null;
}
