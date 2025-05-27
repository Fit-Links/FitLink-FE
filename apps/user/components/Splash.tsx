"use client";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import splashIcon from "@user/public/splash_screens/web_splash_icon.avif";

import { reissueToken, saveTokens } from "@user/services/auth";
import { ReissueTokenApiResponse, ReissueTokenRequestBody } from "@user/services/types/auth.dto";

import RouteInstance from "@user/constants/routes";

type SplashProps = {
  refreshToken: string | undefined;
};
function Splash({ refreshToken }: SplashProps) {
  const router = useRouter();

  if (refreshToken === undefined) {
    router.push(RouteInstance["login"]());
  }

  const { mutate: invalidateToken } = useMutation({
    mutationFn: (refreshToken: ReissueTokenRequestBody) => reissueToken(refreshToken),
    onSuccess: async (data: ReissueTokenApiResponse) => {
      const { data: result } = await saveTokens({
        accessToken: data.data.accessToken,
        refreshToken: refreshToken as string,
      });

      if (result.success) {
        router.push(RouteInstance["schedule-management"]());
      } else {
        router.push(RouteInstance["login"]());
      }
    },
    onError: () => {
      router.push(RouteInstance["login"]());
    },
  });

  useEffect(() => {
    if (refreshToken) {
      invalidateToken({ refreshToken });
    }
  }, []);

  return (
    <section className="bg-background-primary absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <Image src={splashIcon} alt="splash" className="mx-auto mb-4 aspect-auto w-1/3" />
    </section>
  );
}

export default Splash;
