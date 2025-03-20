import Image from "next/image";
import React from "react";

function KakaoContent() {
  return (
    <div className="text-headline flex h-full items-center justify-center gap-2 bg-[#FDDC3F] font-semibold text-[#3A2929]">
      <Image src="/kakao_logo.png" alt="카카오 로그인" height={15} width={15} />
      <span>카카오 로그인</span>
    </div>
  );
}

export default KakaoContent;
