import { cn } from "@ui/lib/utils";
import React from "react";

import HeaderProvider from "@user/components/Providers/HeaderProvider";

import { commonLayoutContents } from "@user/constants/styles";

import LoginButton from "./_components/LoginButton";
import GoogleContent from "./_components/LoginButton/GoogleContent";
import KakaoContent from "./_components/LoginButton/KakaoContent";
import NaverContent from "./_components/LoginButton/NaverContent";

function LoginPage() {
  return (
    <>
      <HeaderProvider>
        <main className={cn(commonLayoutContents)}>
          <div className="flex flex-1 flex-col justify-between pb-[3.375rem] pt-[6.25rem]">
            <div>
              <h1 className="text-[1.6875rem] font-medium">
                가장 편한 방법으로 <br />
                시작해보세요!
              </h1>
              <h3 className="text-body-1">1분이면 회원가입이 가능해요</h3>
            </div>
            <div className="flex flex-col items-center gap-4">
              <LoginButton type="kakao" renderContent={KakaoContent} />
              <LoginButton type="naver" renderContent={NaverContent} />
              <LoginButton type="google" renderContent={GoogleContent} />
            </div>
          </div>
        </main>
      </HeaderProvider>
    </>
  );
}

export default LoginPage;
