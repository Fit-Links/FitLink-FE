"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import { MemorizedChangePhoneLink } from "./MemorizedChangePhoneLink";
import { MemorizedProfileItem } from "./MemorizedProfileItem";
import { getFormattedPhoneNumber } from "../../_utils/getPhoneNumberFormat";

export default function MyDetailInformations() {
  const { data: response, isLoading } = useQuery(myInformationQueries.detail());

  if (isLoading) {
    return <div>Loading</div>;
  }

  const myDetailInformation = response?.data;

  return (
    <section className="w-full flex-col">
      <MemorizedProfileItem type="name" value={myDetailInformation?.name ?? ""} />
      <MemorizedProfileItem type="birthday" value={myDetailInformation?.birthDate ?? ""} />
      <MemorizedChangePhoneLink
        value={`${getFormattedPhoneNumber(myDetailInformation?.phoneNumber ?? "")}`}
      />
    </section>
  );
}
