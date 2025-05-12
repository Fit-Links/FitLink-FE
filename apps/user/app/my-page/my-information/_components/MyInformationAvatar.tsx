"use client";

import { Button } from "@ui/components/Button";
import React from "react";

import { MyInformationDetailApiResponse } from "@user/services/types/myInformation.dto";

import EditProfileBottomSheet from "./BottomSheet/EditProfileBottomSheet";
import ProfileImage from "./ProfileImage";

const mockData: MyInformationDetailApiResponse["data"] = {
  memberId: 3,
  profilePictureUrl: "",
  name: "마승현",
  birthDate: "1997-05-14",
  phoneNumber: "01020049266",
};

export default function MyInformationAvatar() {
  // const { data: response } = useSuspenseQuery(myInformationQueries.detail());

  // const myDetailInformation: MyInformationDetailApiResponse["data"] = response?.data;

  return (
    <>
      <ProfileImage profilePictureUrl={mockData.profilePictureUrl} />

      <EditProfileBottomSheet>
        <Button className="mt-[1.25rem]" variant={"brand"} size={"sm"} corners={"pill"}>
          {mockData.profilePictureUrl ? "프로필 사진 수정" : "프로필 사진 등록"}
        </Button>
      </EditProfileBottomSheet>
    </>
  );
}
