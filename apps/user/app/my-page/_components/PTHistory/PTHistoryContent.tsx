"use client";

import { PtInfo, PtStatus } from "@5unwan/core/api/types/common";
import { useQueryClient, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import PTHistoryItem from "@ui/components/PTHistoryItem";
import { cn } from "@ui/lib/utils";
import { useRef } from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import {
  MyInformationApiResponse,
  MyPtHistoryStatus,
} from "@user/services/types/myInformation.dto";

import useIntersectionObserver from "@user/hooks/useIntersectionObserver";

import { getKoreanDate } from "@user/utils/date";

import MyPageItemSkeleton from "../Skeleton/MyPageItemSkeleton";

export default function PTHistoryContent({ historyFilter }: { historyFilter: PtStatus }) {
  const queryClient = useQueryClient();
  const intersectionRef = useRef<HTMLDivElement>(null);

  const summaryData = queryClient.getQueryData<MyInformationApiResponse>(
    myInformationQueries.summary().queryKey,
  );

  const memberId = summaryData?.data?.memberId;

  const {
    data: ptHistory,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    myInformationQueries.ptHistory(
      historyFilter !== "NONE" ? (historyFilter as MyPtHistoryStatus) : undefined,
    ),
  );

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  useIntersectionObserver({
    target: intersectionRef,
    handleIntersect: handleIntersect,
  });

  if (!memberId || !ptHistory) {
    return null;
  }

  return (
    <section className="mt-[1.25rem] flex h-full flex-col overflow-hidden">
      <div className="flex h-full flex-col gap-[0.625rem] overflow-y-auto">
        {ptHistory &&
          ptHistory.pages.map((page) =>
            page.data.content.map((item: PtInfo) => {
              if (item.status !== (historyFilter as PtStatus) && historyFilter !== "NONE")
                return null;

              return (
                <PTHistoryItem
                  key={`PT-history-item-${item.sessionId}`}
                  reservationDate={getKoreanDate(item.date)}
                  status={item.status as Exclude<PtStatus, "SESSION_CANCELLED">}
                />
              );
            }),
          )}

        <div ref={intersectionRef} className="h-4 w-full">
          {isFetchingNextPage && (
            <div
              className={cn(
                "flex flex-col gap-[0.625rem] overflow-y-auto pb-2",
                !ptHistory && "mt-[1.25rem]",
              )}
            >
              <MyPageItemSkeleton className="min-h-[3.375rem]" />
              <MyPageItemSkeleton className="min-h-[3.375rem]" />
              <MyPageItemSkeleton className="min-h-[3.375rem]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
