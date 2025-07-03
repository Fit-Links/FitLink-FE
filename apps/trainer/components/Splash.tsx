"use client";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { registerServiceWorker } from "@trainer/lib/firebaseMessaging";
import splashIcon from "@trainer/public/splash_screens/web_splash_icon.avif";

import { reissueToken, saveTokens } from "@trainer/services/auth";

import RouteInstance from "@trainer/constants/route";

type SplashProps = {
  refreshToken: string | undefined;
};

function Splash({ refreshToken }: SplashProps) {
  const router = useRouter();

  if (!refreshToken) {
    router.push(RouteInstance["login"]());
  }

  const { mutate: invalidateToken } = useMutation({
    mutationFn: (refreshToken: string) => reissueToken({ refreshToken }),
    onSuccess: async (data) => {
      await saveTokens({
        accessToken: data.data.accessToken,
        refreshToken: refreshToken as string,
      });
      router.push(RouteInstance["schedule-management"]());
    },
    onError: () => {
      router.push(RouteInstance["login"]());
    },
  });

  useEffect(() => {
    registerServiceWorker();
    if (refreshToken) {
      invalidateToken(refreshToken);
    }
  }, []);

  return (
    <section className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <Image src={splashIcon} alt="splash" className="aspect-auto w-1/3 " />
    </section>
  );
}

export default Splash;
