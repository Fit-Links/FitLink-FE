"use client";

import React from "react";

import { MyInformationDetailApiResponse } from "@user/services/types/myInformation.dto";

import { MemorizedChangePhoneLink } from "./MemorizedChangePhoneLink";
import { MemorizedProfileItem } from "./MemorizedProfileItem";
import { formatPhoneNumber } from "../_utils/format";

const mockData: MyInformationDetailApiResponse["data"] = {
  memberId: 3,
  profilePictureUrl: "",
  name: "마승현",
  birthDate: "1997-05-14",
  phoneNumber: "01020049266",
};

export default function MyDetailInformations() {
  // const { data: response } = useSuspenseQuery(myInformationQueries.detail());

  // const myDetailInformation: MyInformationDetailApiResponse["data"] = response?.data;

  return (
    <section className="w-full flex-col">
      <MemorizedProfileItem type="name" value={mockData.name} />
      <MemorizedProfileItem type="birthday" value={mockData.birthDate} />
      <MemorizedChangePhoneLink value={`${formatPhoneNumber(mockData.phoneNumber)}`} />
    </section>
  );
}
