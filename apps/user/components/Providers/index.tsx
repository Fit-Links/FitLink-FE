/* eslint-disable no-magic-numbers */
"use client";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";

import FooterProvider from "./FooterProvider";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      mutations: {
        onError: () => {
          toast.error("요청에 실패했습니다. 다시 시도해주세요!");
        },
        onSuccess: () => {
          toast.success("요청이 완료되었습니다.");
        },
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();

    return browserQueryClient;
  }
}

type ProvidersProps = {
  children: React.ReactNode;
};

function Providers({ children }: ProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <FooterProvider>{children}</FooterProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default Providers;
