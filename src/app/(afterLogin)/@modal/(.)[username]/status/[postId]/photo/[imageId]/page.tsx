import React from "react";
import styles from "./PhotoModal.module.css";
import { faker } from "@faker-js/faker";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/_component/CommentForm";
import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
export default function PhotoModal() {
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
    <div className={styles.container}>
      <PhotoModalCloseButton />
      <div className={styles.imageZone}>
        <img src={post.Images.at(-1)} alt={post.content} />
        <div className={styles.image} style={{ backgroundImage: `url("${post.Images.at(-1)}")` }}></div>
        <div className={styles.buttonZone}>
          <div className={styles.buttonInner}>
            <ActionButtons />
          </div>
        </div>
      </div>
      <div className={styles.commentZone}>
        {/* <Post showImage={false} />
        <CommentForm />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post /> */}
      </div>
    </div>
  );
}
