"use client";

import { ProfileItem } from "@ui/components/ProfileItem";
import React from "react";

import TrainerUnlinkItem from "./TrainerUnlinkItem";
import Header from "../../_components/Header";
import ProfileImage from "../../my-information/_components/ProfileImage";

const mockData = {
  memberId: 2,
  name: "김민수",
  birthDate: "1990-05-12",
  phoneNumber: "010-2938-2312",
  profilePictureUrl: "https://github.com/shadcn.png",
};

export default function MyTrainerInformationContainer() {
  // const { data: myTrainerInformation } = useQuery(myInformationQueries.summary());

  // Trainer 정보 (id와 이름 존재)
  // profileUrl과 phoneNumber가 존재하지 않으므로 백엔드에 수정 요청

  return (
    <>
      <Header title="트레이너" />

      <ProfileImage profilePictureUrl={mockData.profilePictureUrl} />

      <ProfileItem className="w-full" variant={"name"}>
        {mockData.name}
      </ProfileItem>
      <ProfileItem className="w-full" variant={"phone"}>
        {mockData.phoneNumber}
      </ProfileItem>

      <TrainerUnlinkItem />
    </>
  );
}
