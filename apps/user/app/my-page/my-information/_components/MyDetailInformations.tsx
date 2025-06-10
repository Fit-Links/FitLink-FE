"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ProfileItem } from "@ui/components/ProfileItem";
import PushPermissionSwitch from "@ui/components/PushPermissionSwitch";
import React from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import { MemorizedChangePhoneLink } from "./MemorizedChangePhoneLink";
import { MemorizedProfileItem } from "./MemorizedProfileItem";
import { getFormattedPhoneNumber } from "../../_utils/getPhoneNumberFormat";

export default function MyDetailInformations() {
  const { data: response } = useSuspenseQuery(myInformationQueries.detail());

  const myDetailInformation = response?.data;

  return (
    <section className="w-full flex-col">
      <MemorizedProfileItem type="name" value={myDetailInformation?.name ?? ""} />
      <MemorizedProfileItem type="birthday" value={myDetailInformation?.birthDate ?? ""} />
      <MemorizedChangePhoneLink
        value={`${getFormattedPhoneNumber(myDetailInformation?.phoneNumber ?? "")}`}
      />
      <ProfileItem variant="pushAlarm" className="w-full">
        <PushPermissionSwitch />
      </ProfileItem>
    </section>
  );
}
