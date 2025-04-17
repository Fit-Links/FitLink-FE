"use client";

import { PtStatus } from "@5unwan/core/api/types/common";
import { useState } from "react";

import { TargetMemberPtHistoryApiResponse } from "@trainer/services/types/userManagement.dto";

import PtHistoryFilterButton from "./PtHistoryFilterButton";
import PtHistoryList from "./PtHistoryList";

type PtHistoryContainerProps = {
  ptHistories: TargetMemberPtHistoryApiResponse["data"]["content"];
};

const PT_STATUS_OPTIONS = ["전체", "PT완료", "불참석", "미처리"];
const STATUS_MAP: Record<string, Exclude<PtStatus, "PENDING">> = {
  PT완료: "COMPLETED",
  불참석: "NO_SHOW",
  미처리: "NONE",
};

function PtHistoryContainer({ ptHistories }: PtHistoryContainerProps) {
  const [selectedPtStatus, setSelectedPtStatus] = useState(PT_STATUS_OPTIONS[0]);

  const filteredPtHistories = ptHistories.filter(({ status }) =>
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
