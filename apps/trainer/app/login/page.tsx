import React from "react";

import { getKoreanDate } from "@trainer/utils/date";

import LoginButton from "./_components/LoginButton";
import ClientDate from "./_components/LoginButton/ClientDate";
import GoogleContent from "./_components/LoginButton/GoogleContent";
import KakaoContent from "./_components/LoginButton/KakaoContent";
import NaverContent from "./_components/LoginButton/NaverContent";

function LoginPage() {
  const date = getKoreanDate("2025-05-10T15:00:00");

  return (
    <main className="flex h-full flex-col justify-between pb-[3.375rem] pt-[6.25rem]">
      <p suppressHydrationWarning>{date.toString()}</p>
      <p suppressHydrationWarning>{date.toLocaleString()}</p>
      <section>
        <h1 className="text-[1.6875rem] font-medium">
          가장 편한 방법으로 <br />
          시작해보세요!
        </h1>
        <h3 className="text-body-1">1분이면 회원가입이 가능해요</h3>
      </section>
      <div className="flex flex-col items-center gap-4">
        <LoginButton type="kakao" renderContent={KakaoContent} />
        <LoginButton type="naver" renderContent={NaverContent} />
        <LoginButton type="google" renderContent={GoogleContent} />
      </div>
      <ClientDate />
    </main>
  );
}

export default LoginPage;
