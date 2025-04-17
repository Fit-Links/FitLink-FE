import { cn } from "@ui/lib/utils";
import Image from "next/image";
import React from "react";

import { OAUTH_TEXT_SIZE_STYLE } from "@trainer/constants/loginButton";

function NaverContent() {
  return (
    <div className="text-text-primary text-headline flex h-full items-center justify-center gap-2 bg-[#00C300] font-semibold">
      <Image src="/naver_logo.png" alt="네이버 로그인" height={15} width={15} />
      <span className={cn(OAUTH_TEXT_SIZE_STYLE)}>네이버 로그인</span>
    </div>
  );
}

export default NaverContent;
