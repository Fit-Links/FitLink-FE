"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { myInformationQueries } from "@trainer/queries/myInformation";

import RouteInstance from "@trainer/constants/route";

import MyPageHeader from "./MyPageHeader";
import ProfileItemForRouting from "./ProfileItemForRouting";

export default function MyPageContainer() {
  const { data: response } = useQuery(myInformationQueries.myInformation());

  if (!response) return;

  const myInformationData = response.data;

  return (
    <section>
      <MyPageHeader
        name={myInformationData?.name}
        imageSrc={myInformationData?.profilePictureUrl}
      />

      <ProfileItemForRouting
        className="mt-[1.5625rem]"
        variant="code"
        url={RouteInstance["trainer-code"]()}
      />
      <ProfileItemForRouting variant="calendar" url={RouteInstance["schedule-management"]()} />
    </section>
  );
}
