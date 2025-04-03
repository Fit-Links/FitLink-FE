"use client";

import HeaderInfo from "@ui/components/Header";
import { Text } from "@ui/components/Text";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedDate = searchParams.get("selectedDate");

  return (
    <>
      <HeaderInfo className="box-content pt-3">
        <HeaderInfo.Back onClick={router.back} />
        <HeaderInfo.Title content={"PT 예약"} />
      </HeaderInfo>
      <Text.Subhead1 className="box-content flex items-center justify-center pt-[0.625rem]">
        {selectedDate}
      </Text.Subhead1>
    </>
  );
}

export default Header;
