"use client";

import { PtStatus } from "@5unwan/core/api/types/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { userManagementQueries } from "@trainer/queries/userManagement";

import useIntersectionObserver from "@trainer/hooks/useIntersectionObserver";

import PtHistoryFilterButton from "./PtHistoryFilterButton";
import PtHistoryList from "./PtHistoryList";

type PtHistoryContainerProps = {
  memberId: number;
};

const PT_STATUS_OPTIONS = ["PT완료", "불참석", "예약대기", "PT취소"];
const STATUS_MAP: Record<string, Exclude<PtStatus, "SESSION_PENDING">> = {
  PT완료: "SESSION_COMPLETED",
  불참석: "SESSION_NOT_ATTEND",
  예약대기: "SESSION_WAITING",
  PT취소: "SESSION_CANCELLED",
};

function PtHistoryContainer({ memberId }: PtHistoryContainerProps) {
  const [selectedPtStatus, setSelectedPtStatus] = useState<(typeof PT_STATUS_OPTIONS)[number]>(
    PT_STATUS_OPTIONS[0],
  );

  const intersectionRef = useRef(null);

  const {
    data: ptHistory,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...userManagementQueries.ptHistory(memberId, STATUS_MAP[selectedPtStatus]),
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          content: page.data.content.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          ),
        },
      })),
    }),
  });

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  useIntersectionObserver({
    target: intersectionRef,
    handleIntersect,
  });

  const filteredPtHistories = ptHistory?.pages
    .flatMap(({ data }) => data.content)
    .filter(({ status }) =>
      selectedPtStatus === "전체" ? true : status === STATUS_MAP[selectedPtStatus],
    );

  return (
    <section className="mt-[1.563rem] flex h-full w-full flex-col overflow-hidden">
      <p className="text-headline mb-[0.625rem] w-full text-left">PT 내역</p>
      <section className="flex h-full w-full flex-col overflow-y-auto">
        <PtHistoryFilterButton
          ptStatusOptions={PT_STATUS_OPTIONS}
          selectedPtStatus={selectedPtStatus}
          onChangeSelectedPtStatus={setSelectedPtStatus}
        />
        {/** TODO: 회원의 고정 예약 날짜/시간도 나타내기 */}
        <PtHistoryList ptHistories={filteredPtHistories} ref={intersectionRef} />
      </section>
    </section>
  );
}

export default PtHistoryContainer;
