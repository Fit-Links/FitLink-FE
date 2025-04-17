import { cn } from "@ui/lib/utils";
import Image from "next/image";
import React from "react";

import { OAUTH_LOGO_SIZE, OAUTH_TEXT_SIZE_STYLE } from "@trainer/constants/loginButton";

function GoogleContent() {
  return (
    <div className="text-headline flex h-full items-center justify-center gap-2 bg-[#E9E9E9] font-semibold text-[#1C1C1C]">
      <Image
        src="/google_logo.png"
        alt="구글 로그인"
        height={OAUTH_LOGO_SIZE}
        width={OAUTH_LOGO_SIZE}
      />
      <span className={cn(OAUTH_TEXT_SIZE_STYLE)}>구글 로그인</span>
    </div>
  );
}

export default GoogleContent;
