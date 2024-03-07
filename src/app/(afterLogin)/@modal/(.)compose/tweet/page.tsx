"use client";
import React, { ChangeEventHandler, EventHandler, FormEventHandler, useRef, useState } from "react";
import styles from "./Tweet.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useModalStore } from "@/store/modal";
import Link from "next/link";
import ReactTextareaAutosize from "react-textarea-autosize";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/model/Post";
import { produce } from "immer";
export default function TweetModal() {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<Array<{dataUrl:string; file:File}|null>>([])
  const router = useRouter();
  const {data:me} = useSession();
  const modalStore = useModalStore();
  const queryClient = useQueryClient();
  const imageRef = useRef<HTMLInputElement|null>(null);
  const postId = modalStore.data?.postId
  if(!me?.user){
    router.replace("/i/flow/login");
  }
  console.log("postId", postId)
  const create = useMutation({
    mutationFn: (formData:FormData) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
        method: "POST",
        credentials: "include",
        body: formData
      });
    },
    onSuccess: async (response) => {
      const newPost = await response?.json();
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "posts"){
          const values: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey);
          if(values && "pages" in values){
            const newValues = produce(values, draft => {
              draft.pages[0].unshift(newPost);
            });
            queryClient.setQueryData(queryKey, newValues);
          }
        }
      })
    },
    onError: (error) => {
      console.log(error);
      alert("게시하는 중 에러가 발생했습니다.");
    },
    onSettled: () => {
      modalStore.reset();
      router.back();
    }
  });

  const comment = useMutation({
    mutationFn:  (formData:FormData) => {
     
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/comments`, {
        method: "POST",
        credentials: "include",
        body: formData
      });
    },
    onSuccess: async (response) => {
      const newComment = await response?.json();
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "posts"){
          const values: Post| InfiniteData<Post[]>|undefined = queryClient.getQueryData(queryKey);
          if(values && "pages" in values){
            const obj = values.pages.flat().find((post) => post.postId === postId);
            if(obj){
              const pageIndex = values.pages.findIndex((page) => page.includes(obj));
              const index = values.pages[pageIndex].findIndex((post) => post.postId === obj.postId);
              if(index > -1){
                console.log("index", values.pages[pageIndex][index],obj.Comments)
                let newValues = {...values}
                if(obj.Comments){
                   newValues = produce(values, draft => {
               
                    draft.pages[pageIndex][index].Comments.unshift({userId: me?.user?.email as string});
                    draft.pages[pageIndex][index]._count.Comments += 1;
                    draft.pages[0].unshift(newComment);
                  })
                }else {
                  newValues = produce(values, draft => {
               
                    draft.pages[pageIndex][index].Comments = [{userId: me?.user?.email as string}];
                    // draft.pages[pageIndex][index]._count = {Comments: 1};
                    draft.pages[0].unshift(newComment);
                  })
                }
               
                queryClient.setQueryData(queryKey, newValues);
              }
            }
          }else if(values){
            const newValue = produce(values, draft => {
              draft.Comments.unshift({userId: me?.user?.email as string});
              draft._count.Comments += 1;
            })
            queryClient.setQueryData(queryKey, newValue);
          }
        }
    })
    },
    onError: (error) => {
      console.log(error);
      alert('댓글 등록 과정에서 에러가 발생했습니다.');
    },
    onSettled: () => {
      modalStore.reset();
      router.back();
    }
  })

  const handleClose = () => {
    router.back();
    modalStore.reset();
  };

  const submitTweet:FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if(content.trim() === ""){
      alert("내용은 비워둘 수 없습니다.");
      return;
    }
    const formData = new FormData();
    formData.append("content", content);
    imagePreview.forEach((image) => {
      image && formData.append("images", image.file);
    })
    

    if(modalStore.mode === "new"){
      create.mutate(formData);
    }else if(modalStore.mode === "comment" && modalStore.data){
      comment.mutate(formData);
    }

  }

  const clickImage = () => {
  
    if(imageRef?.current){
      imageRef.current.click();
    }
  }

  const addImage:ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    if(e.target.files){
      Array.from(e.target.files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview((prevArray) => {
            const newArray = [...prevArray];
            newArray[index] = {dataUrl: reader.result as string, file};
            return newArray
          })
        }
        reader.readAsDataURL(file);
      })
    }
  } 

  const removeImage = (index:number) => {
    setImagePreview((prevArray) => {
      const copyArray = [...prevArray];
      copyArray[index] = null;
      return copyArray;
    })
  }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleClose}>
          <svg
            width="24"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
          >
            <g>
              <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
            </g>
          </svg>
        </button>
        <form className={styles.modalForm} onSubmit={submitTweet}>
          {modalStore.data && (
            <div className={styles.modalOriginal}>
              <div className={styles.postUserSection}>
                <div className={styles.postUserImage}>
                  <Image src={modalStore.data.User.image} alt={modalStore.data.User.id} width={40} height={40} />
                </div>
              </div>
              <div>
                {modalStore.data.content}
                <div>
                  <Link href={`/${modalStore.data.User.id}`} style={{color: "rgb(29, 155, 240)"}}>@{modalStore.data.User.id}</Link>
                  님에게 보내는 답글
                </div>
              </div>
            </div>
          )}
          <div className={styles.modalBody}>
            <div className={styles.postUserSection}>
              <div className={styles.postUserImage}>
                <Image alt="profile image" src={me?.user?.image || ''} width={40} height={40} />
              </div>
            </div>
            <div className={styles.inputDiv}>
              <ReactTextareaAutosize
                className={styles.input}
                placeholder="무슨 일이 일어나고 있나요?"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
              <div style={{ display: "flex" }}>
                {imagePreview.length > 0 && imagePreview.map((image, index) => (
                 image &&  <img onClick={() => removeImage(index)} src={image?.dataUrl || ""} alt={`${index}`} key={index} style={{width: "100%", objectFit: "contain", maxHeight: 100}} />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <div className={styles.modalDivider}></div>
            <div className={styles.footerButtons}>
              <div className={styles.footerButtonLeft}>
                <input multiple onChange={addImage} ref={imageRef} hidden type="file" name="imageFiles" />
                <button onClick={clickImage} className={styles.uploadButton} type="button">
                  <svg width="24" viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                    </g>
                  </svg>
                </button>
              </div>
              <button className={styles.actionButton} disabled={content === ""}>
                게시하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
