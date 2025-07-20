/* eslint-disable no-magic-numbers */
"use client";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { Toaster, toast } from "sonner";

import { useFcmListener } from "@user/hooks/useFcmListener";

import FooterProvider from "./FooterProvider";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 20,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
      },

      mutations: {
        onError: (error) => {
          toast.error("요청에 실패했습니다", { description: error.message });
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
  // const router = useRouter();

  // useEffect(() => {
  //   const fetchUserStatus = async () => {
  //     try {
  //       const statusData = await queryClient.fetchQuery(authQueries.status());

  //       if (statusData.data.userRole === "MEMBER") {
  //         const urlObj = new URL(window.location.href).hostname;

  //         if (urlObj.includes("dev.trainer")) {
  //           router.replace(devUser);
  //         } else if (urlObj.includes("trainer")) {
  //           router.replace(prodUser);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("사용자 Role 확인 실패:", error);
  //     }
  //   };

  //   fetchUserStatus();
  // }, [router, queryClient]);

  useFcmListener();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        swipeDirections={["top", "left", "right"]}
        duration={3000}
        richColors
      />
      <FooterProvider>{children}</FooterProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default Providers;
