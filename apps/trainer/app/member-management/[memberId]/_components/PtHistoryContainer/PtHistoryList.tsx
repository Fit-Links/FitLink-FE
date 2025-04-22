"use client";

import { PtStatus } from "@5unwan/core/api/types/common";
import { Button } from "@ui/components/Button";
import PTHistoryItem from "@ui/components/PTHistoryItem";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import DateController from "@ui/lib/DateController";
import React, { useRef, useState } from "react";

import { TargetMemberPtHistoryApiResponse } from "@trainer/services/types/userManagement.dto";

type PtHistoryListProps = {
  ptHistories: TargetMemberPtHistoryApiResponse["data"]["content"];
};

function PtHistoryList({ ptHistories }: PtHistoryListProps) {
  const [ptHistoryEditSheetOpen, setPtHistoryEditSheetOpen] = useState(false);
  const reservationFormatDateRef = useRef("");

  const handleClickPtHistoryEdit = (status: PtStatus, reservationDate: string) => {
    if (status === "NONE") {
      setPtHistoryEditSheetOpen(true);
      reservationFormatDateRef.current = DateController(reservationDate).toDateTimeWithDayFormat();
    }
  };

  return (
    <>
      <section className="mt-5 flex h-full w-full flex-col gap-[0.625rem] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {ptHistories.map(({ reservationDate, sessionId, status }) => (
          <PTHistoryItem
            key={sessionId}
            // onClick={() => handleClickPtHistoryEdit(status)}
            reservationDate={reservationDate}
            status={status as Exclude<PtStatus, "PENDING">}
            className="flex-none"
            onClick={() => handleClickPtHistoryEdit(status, reservationDate)}
          />
        ))}
      </section>
      <Sheet open={ptHistoryEditSheetOpen} onOpenChange={setPtHistoryEditSheetOpen}>
        <SheetHeader>
          <SheetContent
            side={"bottom"}
            className="md:max-w-mobile left-1/2 w-full -translate-x-1/2"
          >
            <SheetTitle className="text-center">PT 수업이 완료되었나요?</SheetTitle>
            <div className="bg-background-sub1 rounded-[0.625rem] px-[7.438rem] py-[2.313rem] text-center">
              {reservationFormatDateRef.current}
            </div>
            <SheetFooter>
              <div className="flex w-full gap-[0.625rem]">
                {/** TODO: PT 수업 참석 여부 API 요청 */}
                <SheetClose asChild>
                  <Button className="bg-background-sub1 hover:bg-background-sub3 h-[3.375rem] flex-1 transition-colors">
                    불참석
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="bg-background-sub5 text-text-sub5 hover:bg-background-sub4 h-[3.375rem] flex-1 transition-colors">
                    PT완료
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </SheetContent>
        </SheetHeader>
      </Sheet>
    </>
  );
}

export default PtHistoryList;
