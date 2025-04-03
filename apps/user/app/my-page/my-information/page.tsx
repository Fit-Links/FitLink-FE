"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/Avatar";
import { Button } from "@ui/components/Button";
import React, { useState } from "react";

import { MyInformationDetailApiResponse } from "@user/services/types/myInformation.dto";

import Header from "../_components/Header";
import EditProfileBottomSheet from "./_components/BottomSheet/EditProfileBottomSheet";
import { MemorizedChangePhoneLink } from "./_components/MemorizedChangePhoneLink";
import { MemorizedProfileItem } from "./_components/MemorizedProfileItem";

export default function MyInformation() {
  const [mockData, setMockData] = useState<MyInformationDetailApiResponse["data"]>({
    memberId: 1,
    name: "홍길동",
    birthDate: "2024-05-12",
    phoneNumber: "010 2938 2312",
    profilePictureUrl: "https://github.com/shadcn.png",
  });

  const handleChangeMyInformation = (
    key: keyof MyInformationDetailApiResponse["data"],
    value: string,
  ) => {
    setMockData({
      ...mockData,
      [key]: value,
    });
  };

  return (
    <main className="flex h-screen w-full flex-col items-center pb-[5.063rem]">
      <Header title="내 정보" />

      <Avatar className=" mt-[1.563rem] h-[6.313rem] w-[6.313rem]">
        <AvatarFallback />
        <AvatarImage src={mockData.profilePictureUrl} />
      </Avatar>

      <EditProfileBottomSheet onChangeMyInformation={handleChangeMyInformation}>
        <Button className="mt-[1.25rem]" variant={"brand"} size={"sm"} corners={"pill"}>
          {mockData.profilePictureUrl ? "프로필 사진 수정" : "프로필 사진 등록"}
        </Button>
      </EditProfileBottomSheet>

      <MemorizedProfileItem type="name" value={mockData.name} />
      <MemorizedProfileItem type="birthday" value={mockData.birthDate} />
      <MemorizedChangePhoneLink value={`${mockData.phoneNumber}`} />
    </main>
  );
}
