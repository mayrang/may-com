"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function RQProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retryOnMount: true,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retry: false,
        },
      },
    })
  );
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"} />
    </QueryClientProvider>
  );
}
