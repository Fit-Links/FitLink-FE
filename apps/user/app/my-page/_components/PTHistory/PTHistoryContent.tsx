"use client";

import { PtInfo, PtStatus } from "@5unwan/core/api/types/common";
import PTHistoryItem from "@ui/components/PTHistoryItem";
import { useContext } from "react";

import { MyPtHistoryApiResponse } from "@user/services/types/myInformation.dto";

import { PTHistoryContext } from "./PTHistoryContext";

const ptHistory: MyPtHistoryApiResponse["data"] = {
  content: [
    {
      sessionId: 1,
      reservationDate: "2024-01-01",
      status: "COMPLETED",
    },
  ],
  totalPages: "1",
  totalElements: "10",
};

export default function PTHistoryContent() {
  const { historyFilter } = useContext(PTHistoryContext);

  // const { data: myInformation } = useQuery(myInformationQueries.summary());

  // const memberId = myInformation?.data?.memberId;

  // if (memberId) {
  // const { data: historys } = useInfiniteQuery(
  //   myInformationQueries.ptHistory(memberId, undefined),
  // );
  // }

  return (
    <section className="mt-[1.25rem] flex flex-col gap-[0.625rem] overflow-y-auto pb-2">
      {ptHistory &&
        ptHistory.content.map((item: PtInfo) => {
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
