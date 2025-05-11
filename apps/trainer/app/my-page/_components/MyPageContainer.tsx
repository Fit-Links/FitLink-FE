"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

import { myInformationQueries } from "@trainer/queries/myInformation";

import { MyInformationApiResponse } from "@trainer/services/types/myInformation.dto";

import RouteInstance from "@trainer/constants/route";

import MyPageHeader from "./MyPageHeader";
import ProfileItemForRouting from "../_components/ProfileItemForRouting";

export default function MyPageContainer() {
  const { data: response } = useSuspenseQuery(myInformationQueries.myInformation());

  const myInformationData: MyInformationApiResponse["data"] = response;

  return (
    <section>
      <MyPageHeader name={myInformationData?.name} imageSrc={myInformationData?.profileUrl} />

      <ProfileItemForRouting variant="code" url={RouteInstance["trainer-code"]()} />
      <ProfileItemForRouting variant="calendar" url={RouteInstance["schedule-management"]()} />
    </section>
  );
}
