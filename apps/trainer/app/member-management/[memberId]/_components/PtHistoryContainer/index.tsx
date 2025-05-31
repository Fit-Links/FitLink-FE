"use client";

import { PtStatus } from "@5unwan/core/api/types/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

import { userManagementQueries } from "@trainer/queries/userManagement";

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

  const { data: ptHistory } = useInfiniteQuery(
    userManagementQueries.ptHistory(memberId, STATUS_MAP[selectedPtStatus]),
  );

  const filteredPtHistories = ptHistory?.pages
    .flatMap(({ data }) => data.content)
    .filter(({ status }) =>
      selectedPtStatus === "전체" ? true : status === STATUS_MAP[selectedPtStatus],
    );

  return (
    <section className="mt-[1.563rem] max-h-[20rem] w-full">
      <p className="text-headline mb-[0.625rem] w-full text-left">PT 내역</p>
      <section className="h-full w-full">
        <PtHistoryFilterButton
          ptStatusOptions={PT_STATUS_OPTIONS}
          selectedPtStatus={selectedPtStatus}
          onChangeSelectedPtStatus={setSelectedPtStatus}
        />
        {/** TODO: 회원의 고정 예약 날짜/시간도 나타내기 */}
        <PtHistoryList ptHistories={filteredPtHistories} />
      </section>
    </section>
  );
}

export default PtHistoryContainer;
