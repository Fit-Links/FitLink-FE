import Image from "next/image";
import React from "react";

function NaverContent() {
  return (
    <div className="text-text-primary text-headline flex h-full items-center justify-center gap-2 bg-[#00C300] font-semibold">
      <Image src="/naver_logo.png" alt="네이버 로그인" height={12} width={12} />
      <span>네이버 로그인</span>
    </div>
  );
}

export default NaverContent;
