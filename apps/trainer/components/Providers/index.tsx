/* eslint-disable no-magic-numbers */
"use client";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useMemo } from "react";
import { Toaster, toast } from "sonner";

import { useFcmListener } from "@trainer/hooks/useFcmListener";

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
  const queryClient = useMemo(() => getQueryClient(), []);
  // const router = useRouter();
  // const pathname = usePathname();

  // useEffect(() => {
  //   const domainUrl = new URL(window.location.href).hostname;

  //   (async () => {
  //     try {
  //       const userRole = await queryClient.fetchQuery(authQueries.status());

  //       if (userRole.data.userRole === "MEMBER") {
  //         if (domainUrl.includes("dev.user")) {
  //           router.replace(devUser);
  //         } else if (domainUrl.includes("user")) {
  //           router.replace(prodUser);
  //         }
  //       }
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         if (pathname !== "login") {
  //           router.replace("/login");
  //         }
  //       }
  //       console.error("사용자 Role 확인 실패");
  //     }
  //   })();
  // }, [pathname, router]);

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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
