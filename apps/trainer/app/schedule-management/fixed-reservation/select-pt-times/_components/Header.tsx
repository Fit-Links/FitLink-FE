"use client";

import HeaderInfo from "@ui/components/Header";
import { Text } from "@ui/components/Text";
import { useRouter } from "next/navigation";

type HeaderProps = {
  isEdit: boolean;
};

function Header({ isEdit }: HeaderProps) {
  const router = useRouter();

  return (
    <>
      <HeaderInfo className="box-content pt-3">
        <HeaderInfo.Back onClick={router.back} />
        <HeaderInfo.Title content={isEdit ? "PT 고정 예약 변경" : "PT 고정 예약"} />
      </HeaderInfo>
      <Text.Subhead2 className="text-text-sub2 box-content flex items-center justify-center pt-[0.625rem]">
        {isEdit
          ? "고정 예약 변경은 한 번에 한 타임씩만 가능합니다"
          : "고정하고 싶은 PT 시간을 선택해 주세요"}
      </Text.Subhead2>
    </>
  );
}

export default Header;
