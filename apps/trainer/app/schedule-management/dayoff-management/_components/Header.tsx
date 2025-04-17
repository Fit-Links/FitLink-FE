"use client";

import HeaderInfo from "@ui/components/Header";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();

  return (
    <HeaderInfo className="box-content pt-3">
      <HeaderInfo.Back onClick={router.back} />
      <HeaderInfo.Title content={"휴무일 설정"} />
    </HeaderInfo>
  );
}

export default Header;
