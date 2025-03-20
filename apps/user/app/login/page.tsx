import React from "react";

import LoginButton from "@user/components/LoginButton";
import GoogleContent from "@user/components/LoginButton/GoogleContent";
import KakaoContent from "@user/components/LoginButton/KakaoContent";
import NaverContent from "@user/components/LoginButton/NaverContent";

function LoginPage() {
  return (
    <div className="flex h-full flex-col justify-between pb-[3.375rem] pt-[6.25rem]">
      <main>
        <h1 className="text-[1.6875rem] font-medium">
          가장 편한 방법으로 <br />
          시작해보세요!
        </h1>
        <h3 className="text-body-1">1분이면 회원가입이 가능해요</h3>
      </main>
      <div className="flex flex-col items-center gap-4">
        <LoginButton type="kakao" renderContent={KakaoContent} />
        <LoginButton type="naver" renderContent={NaverContent} />
        <LoginButton type="google" renderContent={GoogleContent} />
      </div>
    </div>
  );
}

export default LoginPage;
