"use client";

import { PtInfo, PtStatus } from "@5unwan/core/api/types/common";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import PTHistoryItem from "@ui/components/PTHistoryItem";
import { useContext } from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import { MyInformationApiResponse } from "@user/services/types/myInformation.dto";

import { PTHistoryContext } from "./PTHistoryContext";

export default function PTHistoryContent() {
  const { historyFilter } = useContext(PTHistoryContext);

  const queryClient = useQueryClient();

  const summaryData = queryClient.getQueryData<MyInformationApiResponse>(
    myInformationQueries.summary().queryKey,
  );

  const memberId = summaryData?.data?.memberId;

  if (!memberId) return;

  const { data: ptHistory, isLoading } = useInfiniteQuery(
    myInformationQueries.ptHistory(memberId, "SESSION_CANCELLED"),
  );

  if (isLoading) return <div></div>;

  return (
    <section className="mt-[1.25rem] flex flex-col gap-[0.625rem] overflow-y-auto pb-2">
      {ptHistory &&
        ptHistory.pages[0].data.content.map((item: PtInfo) => {
          if (item.status !== historyFilter && historyFilter !== "ALL") return;

          return (
            <PTHistoryItem
              key={`PT-history-item-${item.sessionId}`}
              reservationDate={item.reservationDate}
              status={item.status as Exclude<PtStatus, "PENDING">}
            />
          );
        })}
    </section>
  );
}
