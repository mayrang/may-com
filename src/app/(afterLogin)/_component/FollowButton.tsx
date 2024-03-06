"use client";
import React, { MouseEventHandler } from "react";
import styles from "./FollowRecommend.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/model/User";
import { produce } from "immer";

type Props = {
  user: User
}
export default function FollowButton({user}: Props) {
  const router = useRouter();
  const { data } = useSession();
  const queryClient = useQueryClient()
  const follow = useMutation({
    mutationFn: (userId:string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        method: "POST",
        credentials: "include"
      })
    },
    onMutate: (userId:string) => {
      console.log("userid", userId)
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "users" && queryKey[1] === data?.user?.email as string){
          const value:User|undefined = queryClient.getQueryData(queryKey)
          if(value){
            const newValue = produce(value, draft => {
              draft.Followers.push({id: data?.user?.email as string});
              draft._count.Followers += 1
            });
            queryClient.setQueryData(queryKey, newValue);

          }
        }else if(queryKey[0] === "users" && queryKey[1] === "followRecommends"){
          const values:User[]|undefined = queryClient.getQueryData(queryKey);
          if(values){
            const index = values.findIndex((user) => user.id === userId);
            if(index > -1){
              const newValues = produce(values, draft => {
                draft[index].Followers.push({id: data?.user?.email as string});
                draft[index]._count.Followers += 1;
              });
              queryClient.setQueryData(queryKey, newValues);
            }
          }
        
        }
      })
    },
    onError: (userId:string) => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "users" && queryKey[1] === data?.user?.email as string){
          const value:User|undefined = queryClient.getQueryData(queryKey)
          if(value){
            const newValue = produce(value, draft => {
              draft.Followers = draft.Followers.filter((user) => user.id !== data?.user?.email as string);
              draft._count.Followers -= 1
            });
            queryClient.setQueryData(queryKey, newValue);

          }
        }else if(queryKey[0] === "users" && queryKey[1] === "followRecommends"){
          const values:User[]|undefined = queryClient.getQueryData(queryKey);
          if(values){
            const index = values.findIndex((user) => user.id === userId);
            if(index > -1){
              const newValues = produce(values, draft => {
                draft[index].Followers = draft[index].Followers.filter((user) => user.id !== data?.user?.email as string);
                draft[index]._count.Followers -= 1;
              });
              queryClient.setQueryData(queryKey, newValues);
            }
          }
        
        }
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ["users"]})
    }
  })

  const unfollow = useMutation({
    mutationFn: (userId:string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        method: "DELETE",
        credentials: "include"
      });
    },
    onMutate: (userId:string) => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "users" && queryKey[1] === data?.user?.email as string){
          const value:User|undefined = queryClient.getQueryData(queryKey)
          if(value){
            const newValue = produce(value, draft => {
              draft.Followers = draft.Followers.filter((user) => user.id !== data?.user?.email as string);
              draft._count.Followers -= 1
            });
            queryClient.setQueryData(queryKey, newValue);

          }
        }else if(queryKey[0] === "users" && queryKey[1] === "followRecommends"){
          const values:User[]|undefined = queryClient.getQueryData(queryKey);
          if(values){
            const index = values.findIndex((user) => user.id === userId);
            if(index > -1){
              const newValues = produce(values, draft => {
                draft[index].Followers = draft[index].Followers.filter((user) => user.id !== data?.user?.email as string);
                draft[index]._count.Followers -= 1;
              });
              queryClient.setQueryData(queryKey, newValues);
            }
          }
        
        }
      })
    },
    onError: (userId:string) => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "users" && queryKey[1] === data?.user?.email as string){
          const value:User|undefined = queryClient.getQueryData(queryKey)
          if(value){
            const newValue = produce(value, draft => {
              draft.Followers.push({id: data?.user?.email as string});
              draft._count.Followers += 1
            });
            queryClient.setQueryData(queryKey, newValue);

          }
        }else if(queryKey[0] === "users" && queryKey[1] === "followRecommends"){
          const values:User[]|undefined = queryClient.getQueryData(queryKey);
          if(values){
            const index = values.findIndex((user) => user.id === userId);
            if(index > -1){
              const newValues = produce(values, draft => {
                draft[index].Followers.push({id: data?.user?.email as string});
                draft[index]._count.Followers += 1;
              });
              queryClient.setQueryData(queryKey, newValues);
            }
          }
        
        }
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ["users"]})
    }
  })
  console.log("user", user?.Followers.find((user) => user.id === data?.user?.email as string))

  const followered = !!user?.Followers.find((user) => user.id === data?.user?.email as string);
  const clickFollow:MouseEventHandler= (e) => {
    e.preventDefault();
    e.stopPropagation()
    console.log("click", data?.user)
    if (!data?.user) {
      router.replace("/i/flow/login");
      return null;  
    }
    if(followered){
      unfollow.mutate(user.id);
    }else{
      follow.mutate(user.id);
    }
    
    return;
  };
  return (
    <div className={styles.followButtonSection}>
      <button onClick={clickFollow}>{followered ? "언팔로우" : "팔로우"}</button>
    </div>
  );
}
