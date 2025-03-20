import Image from "next/image";
import React from "react";

function GoogleContent() {
  return (
    <div className="text-headline flex h-full items-center justify-center gap-2 bg-[#E9E9E9] font-semibold text-[#1C1C1C]">
      <Image src="/google_logo.png" alt="구글 로그인" height={15} width={15} />
      <span>구글 로그인</span>
    </div>
  );
}

export default GoogleContent;
