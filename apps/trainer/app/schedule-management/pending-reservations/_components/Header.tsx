"use client";

import HeaderInfo from "@ui/components/Header";
import { Text } from "@ui/components/Text";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();

  return (
    <>
      <HeaderInfo className="box-content pt-3">
        <HeaderInfo.Back onClick={router.back} />
        <HeaderInfo.Title className="text-headline" content={"PT 예약 대기중"} />
      </HeaderInfo>
      <Text.Body1 className="text-text-sub2 box-content flex items-center justify-center pt-[0.625rem]">
        1명의 회원을 선택하여 예약 승인을 해주세요
      </Text.Body1>
    </>
  );
}

export default Header;
