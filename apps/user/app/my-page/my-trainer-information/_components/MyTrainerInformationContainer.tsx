"use client";

import { useQuery } from "@tanstack/react-query";
import { ProfileItem } from "@ui/components/ProfileItem";
import React from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import TrainerUnlinkItem from "./TrainerUnlinkItem";
import Header from "../../_components/Header";
import { getFormattedPhoneNumber } from "../../_utils/getPhoneNumberFormat";
import ProfileImage from "../../my-information/_components/ProfileImage";

export default function MyTrainerInformationContainer() {
  const { data: response, isLoading } = useQuery(myInformationQueries.summary());

  if (isLoading) {
    return <div>Loading</div>;
  }

  const myTrainerInformation = response?.data;

  return (
    <>
      <Header title="트레이너" />

      <ProfileImage profilePictureUrl={myTrainerInformation?.trainerProfileUrl ?? ""} />

      <ProfileItem className="w-full" variant={"name"}>
        {myTrainerInformation?.name}
      </ProfileItem>

      <ProfileItem className="w-full" variant={"phone"}>
        {getFormattedPhoneNumber(myTrainerInformation?.trainerPhone ?? "")}
      </ProfileItem>

      <TrainerUnlinkItem />
    </>
  );
}
