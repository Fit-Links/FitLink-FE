"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/Avatar";
import { ProfileItem } from "@ui/components/ProfileItem";
import { useState } from "react";

import { MyInformationDetailApiResponse } from "@user/services/types/myInformation.dto";

import Header from "../_components/Header";
import TrainerUnlinkItem from "./_components/TrainerUnlinkItem";

export default function MyTrainerInformation() {
  const [mockData] = useState<MyInformationDetailApiResponse["data"]>({
    memberId: 2,
    name: "김민수",
    birthDate: "1990-05-12",
    phoneNumber: "010-2938-2312",
    profilePictureUrl: "https://github.com/shadcn.png",
  });

  return (
    <main className="flex h-screen w-full flex-col items-center overflow-hidden pb-[5.063rem]">
      <Header title="트레이너" />

      <Avatar className="mt-[1.563rem]  h-[6.313rem] w-[6.313rem]">
        <AvatarFallback />
        <AvatarImage src={mockData.profilePictureUrl} />
      </Avatar>

      <ProfileItem className="w-full" variant={"name"}>
        {mockData.name}
      </ProfileItem>
      <ProfileItem className="w-full" variant={"phone"}>
        {mockData.phoneNumber}
      </ProfileItem>

      <TrainerUnlinkItem />
    </main>
  );
}
