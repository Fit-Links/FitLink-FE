"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

import { myInformationQueries } from "@trainer/queries/myInformation";

import RouteInstance from "@trainer/constants/route";

import { getKoreanDate } from "@trainer/utils/date";

import MyPageHeader from "./MyPageHeader";
import ProfileItemForRouting from "./ProfileItemForRouting";

export default function MyPageContainer() {
  const { data: response } = useSuspenseQuery(myInformationQueries.myInformation());

  if (!response) return;

  const myInformationData = response.data;

  const time = getKoreanDate();

  return (
    <section>
      <MyPageHeader
        name={myInformationData?.name}
        imageSrc={myInformationData?.profilePictureUrl}
      />

      <p suppressHydrationWarning>{time.toString()}</p>
      <p suppressHydrationWarning>{time.toLocaleString()}</p>

      <ProfileItemForRouting
        className="mt-[1.5625rem]"
        variant="code"
        url={RouteInstance["trainer-code"]()}
      />
      <ProfileItemForRouting variant="calendar" url={RouteInstance["dayoff-management"]()} />
    </section>
  );
}
