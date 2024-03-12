"use client";
import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import styles from "./ChatForm.module.css";
import ReactTextareaAutosize from "react-textarea-autosize";
import useSocket from "../_lib/useSocket";
import { useSession } from "next-auth/react";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { Message } from "@/model/Message";
import { produce } from "immer";
import { useMessageStore } from "@/store/message";

type Props = {
  receiverId: string;
};

export default function ChatForm({ receiverId }: Props) {
  const [content, setContent] = useState("");
  const [socket] = useSocket();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const setGodown = useMessageStore().setGodown
  const changeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const submitChat: FormEventHandler = (e) => {
    e.preventDefault();
    console.log("submit chat");
    socket?.emit("sendMessage", {
      senderId: session?.user?.email,
      receiverId: receiverId,
      content,
    });
    const queryData:InfiniteData<Message[]>|undefined = queryClient.getQueryData(["rooms", {senderId: session?.user?.email, receiverId}, "messages"]);
    console.log('1234')
    if(!queryData){
      queryClient.invalidateQueries({queryKey : ["rooms", {senderId: session?.user?.email, receiverId}, "messages"]})
      return;
    }
    const roomArray = [receiverId, session?.user?.email as string]
    roomArray.sort();
    const roomString = roomArray.join("-");
    const data = {
      messageId: queryData.pages.at(-1)?.at(-1)?.messageId ?queryData.pages.at(-1)?.at(-1)?.messageId as number+1: 1,
      senderId: session?.user?.email as string,
      receiverId: receiverId,
      content,
      createdAt: new Date(),
      room: roomString
    }
   
    const newValues = produce(queryData, draft => {
      draft.pages[draft.pages.length - 1].push(data)
    })
    console.log("new values", newValues)
    queryClient.setQueryData(["rooms", {senderId: session?.user?.email, receiverId}, "messages"], newValues)
    setGodown(true);
    setContent("");
  };
  return (
    <div className={styles.formZone}>
      <form onSubmit={submitChat} className={styles.form}>
        <ReactTextareaAutosize
          value={content}
          onChange={changeContent}
          placeholder="새 쪽지 작성하기"
          style={{ height: 20 }}
        />
        <button className={styles.submitButton} type="submit" disabled={!!!content}>
          <svg
            viewBox="0 0 24 24"
            width="18"
            aria-hidden="true"
            className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03"
          >
            <g>
              <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z"></path>
            </g>
          </svg>
        </button>
      </form>
    </div>
  );
}
