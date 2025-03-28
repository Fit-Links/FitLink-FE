"use client";

import HeaderInfo from "@ui/components/Header";
import { Text } from "@ui/components/Text";
import { useRouter } from "next/navigation";

import { RequestReservationMode } from "../page";

type HeaderProps = {
  mode: RequestReservationMode;
};

function Header({ mode }: HeaderProps) {
  const router = useRouter();
  const headerContent = mode === "new" ? "PT 예약" : "PT 예약 변경";

  return (
    <>
      <HeaderInfo>
        <HeaderInfo.Back onClick={router.back} />
        <HeaderInfo.Title content={headerContent} />
      </HeaderInfo>
      {mode === "new" && (
        <Text.Body1 className="text-text-sub2 mt-[0.625rem] flex h-5 justify-center">
          예약은 당일로부터 2주 내에 가능합니다
        </Text.Body1>
      )}
    </>
  );
}

export default Header;
