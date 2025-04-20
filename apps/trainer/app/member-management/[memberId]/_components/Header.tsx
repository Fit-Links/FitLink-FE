"use client";

import HeaderInfo from "@ui/components/Header";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();

  return (
    <HeaderInfo className="z-10 mb-[0.625rem] box-content pt-3">
      <HeaderInfo.Back onClick={router.back} />
      <HeaderInfo.Title content={"회원 정보"} />
    </HeaderInfo>
  );
}

export default Header;
