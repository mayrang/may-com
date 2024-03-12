"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import cls from "classnames";
import dayjs from "dayjs";
import ChatForm from "./ChatForm";
import { DefaultError, InfiniteData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getMessages } from "../_lib/getMessages";
import { Message } from "@/model/Message";
import { useInView } from "react-intersection-observer";
import useInfiniteScroll from "@/app/(afterLogin)/home/_hook/useInfiniteScroll";
import useSocket from "../_lib/useSocket";
import { produce } from "immer";
import { useMessageStore } from "@/store/message";

dayjs.locale("ko");

type Props = {
  receiverId: string;
};

export default function Chat({ receiverId }: Props) {
  const {data:me} = useSession();
  const mainRef = useRef<HTMLDivElement|null>(null);
  const godown = useMessageStore().godown;
  const [pageRender, setPageRender] = useState(true);
  const [adjustingScroll, setAdjustingScroll] = useState(false)
  const setGodown = useMessageStore().setGodown;
  const {data:messages, isFetching, hasPreviousPage,fetchPreviousPage } = useInfiniteQuery<Message[], DefaultError, InfiniteData<Message[]>, [_1:string, {senderId: string; receiverId:string}, _3:string], number>({
    queryKey: ["rooms", {senderId: me?.user?.email as string, receiverId: receiverId}, "messages"],
    queryFn: getMessages,
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.length < 10 ? undefined : firstPage.at(0)?.messageId,
    getNextPageParam: (lastPage) => lastPage.length < 10 ? undefined : lastPage.at(-1)?.messageId 
  })
  const [socket] = useSocket();
  const queryClient = useQueryClient();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if(messages && pageRender){
      setTimeout(() => {
        if(mainRef?.current){
          mainRef.current.scrollTop = mainRef.current.scrollHeight
        }
       
      }, 10)
      setPageRender(false)
    }
  }, [messages, pageRender])

  useEffect(() => {
    if(godown && mainRef.current){    
      console.log(godown, mainRef.current?.scrollHeight, mainRef.current?.scrollTop, "godown")
      mainRef.current.scrollTop = mainRef.current.scrollHeight
      setGodown(false)
    }
  }, [godown])

  useEffect(() => {
    
    console.log(socket?.connected, "socket?");
    socket?.on("receiveMessage", (data:any) => {
      if(!me?.user?.email){
        console.log(me, 1234)
        return
      }
      const queryData:InfiniteData<Message[]>|undefined = queryClient.getQueryData(["rooms", {senderId: me?.user?.email, receiverId}, "messages"]);
      console.log('1234', queryData, 45, ["rooms", {senderId: me?.user?.email, receiverId}, "messages"])
      if(!queryData){
        queryClient.invalidateQueries({queryKey : ["rooms", {senderId: me?.user?.email, receiverId}, "messages"]})
        return;
      }
     
      const newValues = produce(queryData, draft => {
        draft.pages[draft.pages.length - 1].push(data)
      })
      console.log("new values", newValues)
      queryClient.setQueryData(["rooms", {senderId: me?.user?.email, receiverId}, "messages"], newValues)
      setGodown(true)
    });
    return () => {
      socket?.off("receiveMessage");
    };
  }, [socket, me?.user?.email]);
  useInfiniteScroll(() => {
    if (inView) {
      const prevHeight = mainRef.current?.scrollHeight || 0;
      !isFetching && hasPreviousPage && fetchPreviousPage().then(() => {
        setAdjustingScroll(true)
        setTimeout(() => {   
          console.log("test")
          if(mainRef.current){
            mainRef.current.scrollTop = mainRef.current.scrollHeight - prevHeight;
          }
          setAdjustingScroll(false)
          
        }, 0) 
      });
    }
  }, [isFetching, hasPreviousPage, fetchPreviousPage, inView]);
  return (
    <>
  
      <div className={styles.list} ref={mainRef}>
        {!adjustingScroll&& <div style={{ height: 1, background: "yellow", marginBottom: 8 }} ref={ref}></div>}
        {messages?.pages.map((page, idx) => (
       <Fragment key={idx}>
       {page.map((message) => (
        message.senderId === me?.user?.email ? (
          <div className={cls(styles.message,styles.myMessage)}>
            <div className={styles.content}>{message.content}</div>
            <div className={styles.date}>{dayjs(message.createdAt).format("YYYY년 MM월 DD일 A hh시 mm분")}</div>
          </div>
        ): (
          <div className={cls(styles.message,  styles.yourMessage )}>
            <div className={styles.content}>{message.content}</div>
            <div className={styles.date}>{dayjs(message.createdAt).format("YYYY년 MM월 DD일 A hh시 mm분")}</div>
          </div>
        )
       ))}
     </Fragment>
    ))}
      
      
      </div>
      <ChatForm receiverId={receiverId} />
    </>
  );
}
