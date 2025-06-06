"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ProfileItem } from "@ui/components/ProfileItem";
import React from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import TrainerUnlinkItem from "./TrainerUnlinkItem";
import { getFormattedPhoneNumber } from "../../_utils/getPhoneNumberFormat";
import ProfileImage from "../../my-information/_components/ProfileImage";

export default function MyTrainerInformationContainer() {
  const { data: response } = useSuspenseQuery(myInformationQueries.summary());

  const myTrainerInformation = response?.data;

  return (
    <>
      <ProfileImage
        name={myTrainerInformation.trainerName ?? ""}
        profilePictureUrl={myTrainerInformation?.trainerProfileUrl ?? ""}
      />

      <ProfileItem className="mt-[1.5625rem] w-full" variant={"name"}>
        {myTrainerInformation?.trainerName}
      </ProfileItem>

      <ProfileItem className="w-full" variant={"phone"}>
        {getFormattedPhoneNumber(myTrainerInformation?.trainerPhone ?? "")}
      </ProfileItem>

      <TrainerUnlinkItem />
    </>
  );
}
