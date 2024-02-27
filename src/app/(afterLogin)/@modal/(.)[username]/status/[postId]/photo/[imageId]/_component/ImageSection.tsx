"use client";
import React from "react";
import styles from "../PhotoModal.module.css";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import { useQuery } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";
import { getSinglePost } from "@/app/(afterLogin)/[username]/_lib/getSinglePost";

type Props = {
  postId: string;
  imageId: string;
};

export default function ImageSection({ postId, imageId }: Props) {
  const { data: post } = useQuery<IPost, Object, IPost, [_1: string, _2: string]>({
    queryKey: ["post", postId],
    queryFn: getSinglePost,
  });
  const image = post?.Images.find((image) => parseInt(imageId) === image.imageId);
  if (!post || !image) {
    return null;
  }

  return (
    <div className={styles.imageZone}>
      <img src={image?.link || ""} alt={post.content} />
      <div className={styles.image} style={{ backgroundImage: `url("${image?.link}")` }}></div>
      <div className={styles.buttonZone}>
        <div className={styles.buttonInner}>
          <ActionButtons />
        </div>
      </div>
    </div>
  );
}
