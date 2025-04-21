/* eslint-disable no-magic-numbers */
"use client";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import FooterProvider from "./FooterProvider";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
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
      <FooterProvider>{children}</FooterProvider>
    </QueryClientProvider>
  );
}

export default Providers;
