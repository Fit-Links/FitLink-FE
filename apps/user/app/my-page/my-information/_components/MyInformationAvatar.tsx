"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import React from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import EditProfileBottomSheet from "./BottomSheet/EditProfileBottomSheet";
import ProfileImage from "./ProfileImage";

export default function MyInformationAvatar() {
  const { data: response } = useQuery(myInformationQueries.detail());

  const myDetailInformation = response?.data;

  return (
    <>
      <ProfileImage profilePictureUrl={myDetailInformation?.profilePictureUrl ?? ""} />

      <EditProfileBottomSheet>
        <Button className="mt-[1.25rem]" variant={"brand"} size={"sm"} corners={"pill"}>
          {myDetailInformation?.profilePictureUrl ? "프로필 사진 수정" : "프로필 사진 등록"}
        </Button>
      </EditProfileBottomSheet>
    </>
  );
}
