import { Post } from "@/model/Post";
import { create } from "zustand";

interface MessageStore {
   
    godown: boolean;
   
    setGodown: (data:boolean) => void;
 
}

export const useMessageStore = create<MessageStore>((set) => ({
    godown: true,
    setGodown: (data) => {
        set({godown: data})
    }
}))