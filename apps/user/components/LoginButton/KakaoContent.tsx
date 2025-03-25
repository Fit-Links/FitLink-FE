import { cn } from "@ui/lib/utils";
import Image from "next/image";
import React from "react";

import { OAUTH_LOGO_SIZE, OAUTH_TEXT_SIZE_STYLE } from "@user/constants/loginButton";

function KakaoContent() {
  return (
    <div className="text-headline flex h-full items-center justify-center gap-2 bg-[#FDDC3F] font-semibold text-[#3A2929]">
      <Image
        src="/kakao_logo.png"
        alt="카카오 로그인"
        height={OAUTH_LOGO_SIZE}
        width={OAUTH_LOGO_SIZE}
      />
      <span className={cn(OAUTH_TEXT_SIZE_STYLE)}>카카오 로그인</span>
    </div>
  );
}

export default KakaoContent;
