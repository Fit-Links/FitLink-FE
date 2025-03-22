"use client";

import { Button } from "@ui/components/Button";
import DayOfWeekPicker from "@ui/components/DayOfWeekPicker";
import Header from "@ui/components/Header";
import Icon from "@ui/components/Icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/Sheet";
import TimeCellToggleGroup from "@ui/components/TimeCellToggleGroup";
import { TimeCell } from "@ui/utils/timeCellUtils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Home() {
  const router = useRouter();
  const handleClickBack = () => {
    router.push("/my-page");
  };

  const MOCK_TIME_CELL_INFO: TimeCell[] = [
    {
      dayOfWeek: "MON",
      time: "09:00",
      disabled: false,
    },
    {
      dayOfWeek: "TUE",
      time: "10:00",
      disabled: false,
    },
    {
      dayOfWeek: "WED",
      time: "11:00",
      disabled: false,
    },
    {
      dayOfWeek: "THU",
      time: "12:00",
      disabled: false,
    },
    {
      dayOfWeek: "FRI",
      time: "13:00",
      disabled: false,
    },
    {
      dayOfWeek: "SAT",
      time: "14:00",
      disabled: false,
    },
    {
      dayOfWeek: "SUN",
      time: "15:00",
      disabled: false,
    },
    {
      dayOfWeek: "MON",
      time: "16:00",
      disabled: false,
    },
    {
      dayOfWeek: "MON",
      time: "17:00",
      disabled: false,
    },
    {
      dayOfWeek: "MON",
      time: "18:00",
      disabled: false,
    },
    {
      dayOfWeek: "MON",
      time: "19:00",
      disabled: false,
    },
    {
      dayOfWeek: "MON",
      time: "20:00",
      disabled: false,
    },
    {
      dayOfWeek: "MON",
      time: "21:00",
      disabled: false,
    },
    {
      dayOfWeek: "MON",
      time: "22:00",
      disabled: false,
    },
    {
      dayOfWeek: "MON",
      time: "23:00",
      disabled: false,
    },
  ];

  const [timeCell, setTimeCell] = useState<string[]>([]);

  return (
    <main className="flex h-screen w-full flex-col pb-[5.063rem]">
      <Header>
        <Header.Left>
          <Header.Back onClick={handleClickBack} />
        </Header.Left>
        <Header.Title content="PT 희망 시간" />
      </Header>

      <section className="mt-[0.625rem] text-center">
        <p className="text-body-1 text-text-sub2">PT 시간 : 50분</p>
        <p className="text-body-1 text-text-sub2">PT 선택 시간은 시작 시간입니다.</p>
      </section>

      <section className="mt-[1.875rem] w-full">
        <DayOfWeekPicker className="w-full" onCurrentDayChange={() => {}}></DayOfWeekPicker>
        <div className="mt-[1.875rem]">
          <TimeCellToggleGroup
            timeCellInfo={MOCK_TIME_CELL_INFO}
            selected={timeCell}
            onSelectedChange={setTimeCell}
          />
        </div>
      </section>

      <section className="relative h-full w-full">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"brand"} className="absolute bottom-0 h-[3.375rem] w-full">
              수정
            </Button>
          </SheetTrigger>
          <SheetContent side={"bottom"}>
            <SheetHeader>
              <SheetTitle className="flex justify-center">
                <Icon name="Check" className="h-[3.125rem] w-[3.125rem]" background="brand" />
              </SheetTitle>
            </SheetHeader>
            <SheetDescription asChild>
              <div className="text-title-1 text-center">
                <p>회원의 PT 희망 시간이</p>
                <p>수정되었습니다</p>
              </div>
            </SheetDescription>
            <SheetFooter className="flex flex-col gap-[0.625rem]">
              <SheetClose asChild>
                <Button variant={"brand"} className="h-[3.375rem] w-full">
                  확인
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </section>
    </main>
  );
}
