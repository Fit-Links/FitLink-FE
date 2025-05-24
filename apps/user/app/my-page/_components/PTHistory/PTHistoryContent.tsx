"use client";

import { PtInfo, PtStatus } from "@5unwan/core/api/types/common";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import PTHistoryItem from "@ui/components/PTHistoryItem";

import { myInformationQueries } from "@user/queries/myInformation";

import {
  MyInformationApiResponse,
  MyPtHistoryStatus,
} from "@user/services/types/myInformation.dto";

import usePTHistoryFilter from "./_store/PTHistoryFilterStore";

export default function PTHistoryContent() {
  const { historyFilter } = usePTHistoryFilter();

  const queryClient = useQueryClient();

  const summaryData = queryClient.getQueryData<MyInformationApiResponse>(
    myInformationQueries.summary().queryKey,
  );

  const memberId = summaryData?.data?.memberId;

  if (!memberId) return;

  const { data: ptHistory, isLoading } = useInfiniteQuery(
    myInformationQueries.ptHistory(
      historyFilter !== "SESSION_ALL" ? (historyFilter as MyPtHistoryStatus) : undefined,
    ),
  );

  if (isLoading) return <div></div>;

  return (
    <section className="mt-[1.25rem] flex flex-col gap-[0.625rem] overflow-y-auto pb-2">
      {ptHistory &&
        ptHistory.pages[0].data.content.map((item: PtInfo) => {
          if (item.status !== historyFilter && historyFilter !== "SESSION_ALL") return;

          return (
            <>
              <PTHistoryItem
                key={`PT-history-item-${item.sessionId}`}
                reservationDate={new Date(item.date)}
                status={item.status.split("_")[1] as Exclude<PtStatus, "PENDING">}
              />
            </>
          );
        })}
    </section>
  );
}
