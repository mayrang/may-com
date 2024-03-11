"use client";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect } from "react";
import { Socket, io } from "socket.io-client";

let socket: Socket | null;

export default function useSocket(): [Socket | null, () => void] {
  const { data: session } = useSession();
  const disconnect = useCallback(() => {
    socket?.disconnect();
    socket = null;
  }, []);

  useEffect(() => {
    if (!socket) {
      socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
        transports: ["websocket"],
      });
      socket.on("connect", () => {
        console.log("socket connect");
        if (session?.user?.email) {
          socket?.emit("login", { id: session.user.email });
        }
      });
      socket.on("connect_error", (err) => {
        console.log("socket connect error");
        console.error(err);
      });
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.email && socket?.connected) {
      socket?.emit("login", { id: session.user.email });
    }
  }, [session]);
  return [socket, disconnect];
}
