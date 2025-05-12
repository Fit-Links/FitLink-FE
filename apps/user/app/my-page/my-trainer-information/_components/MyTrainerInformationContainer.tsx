"use client";

import { useQuery } from "@tanstack/react-query";
import { ProfileItem } from "@ui/components/ProfileItem";
import React from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import TrainerUnlinkItem from "./TrainerUnlinkItem";
import Header from "../../_components/Header";
import ProfileImage from "../../my-information/_components/ProfileImage";

export default function MyTrainerInformationContainer() {
  const { data: response, isLoading } = useQuery(myInformationQueries.summary());

  if (isLoading) {
    return <div>Loading</div>;
  }

  const myTrainerInformation = response?.data;

  // Trainer 정보 (id와 이름 존재)
  // profileUrl과 phoneNumber가 존재하지 않으므로 백엔드에 수정 요청

  return (
    <>
      <Header title="트레이너" />

      <ProfileImage profilePictureUrl={myTrainerInformation?.profilePictureUrl ?? ""} />

      <ProfileItem className="w-full" variant={"name"}>
        {myTrainerInformation?.name}
      </ProfileItem>

      {/* 
      // 현재 트레이너의 핸드폰 번호가 넘어오지 않아 임시적으로 컴포넌트를 해제한 상태
      <ProfileItem className="w-full" variant={"phone"}>
        {myTrainerInformation?.phoneNumber ?? ""}
      </ProfileItem> */}

      <TrainerUnlinkItem />
    </>
  );
}
