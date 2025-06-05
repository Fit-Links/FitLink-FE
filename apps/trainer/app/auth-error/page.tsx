"use client";

import { Button } from "@ui/components/Button";
import Icon from "@ui/components/Icon";
import { Text } from "@ui/components/Text";
import { useRouter } from "next/navigation";
import React from "react";

import RouteInstance from "@trainer/constants/route";

export default function AuthError() {
  const router = useRouter();

  const handleClickRouteToLogin = () => {
    router.push(RouteInstance["login"]());
  };

  return (
    <main className="flex h-full w-full flex-col items-center justify-between">
      <section className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="bg-brand-primary-500 flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full">
          <Icon name="KeyRound" size={"lg"} />
        </div>

        <Text.Title1 className="mt-7 flex flex-col text-center">인증에 실패하였습니다</Text.Title1>
        <Text.Subhead1 className="text-text-sub2 mt-2">다시 시도해주세요.</Text.Subhead1>
      </section>

      <Button
        variant={"brand"}
        className="mt-10 h-[3.375rem] w-full"
        onClick={handleClickRouteToLogin}
      >
        <Text.Headline1>로그인 페이지 이동</Text.Headline1>
      </Button>
    </main>
  );
}
