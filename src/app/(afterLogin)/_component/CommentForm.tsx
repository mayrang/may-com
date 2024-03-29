"use client";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import styles from "./CommentForm.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
  postId: string;
};

export default function CommentForm({ postId }: Props) {
  const [content, setContent] = useState("");
  const query = useQueryClient();
  const data = query.getQueryData(["posts", postId]);
  const { data: me } = useSession();
  const changeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const submitPost: FormEventHandler = (e) => {
    e.preventDefault();
  };

  if (!me?.user) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <form className={styles.postForm} onSubmit={submitPost}>
      <div className={styles.postUserSection}>
        <div className={styles.postUserImage}>
          <Image src={me?.user.image as string} alt={"profile image"} width={40} height={40} />
        </div>
      </div>
      <div className={styles.postInputSection}>
        <textarea
          value={content}
          placeholder="무슨 일이 일어나고 있나요?"
          onChange={changeContent}
          style={{ height: "48px !important" }}
        />
        <div style={{ display: "flex" }}></div>
        <div className={styles.postButtonSection}>
          <div className={styles.footerButtons}>
            <div className={styles.footerButtonLeft}>
              <input multiple hidden type="file" name="imageFiles" />
              <button className={styles.uploadButton} type="button">
                <svg width="24" viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </button>
            </div>
            <button className={styles.actionButton} disabled={content === ""}>
              답글
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
