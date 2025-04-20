import { Button } from "@ui/components/Button";
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
import { useRouter } from "next/navigation";
import React from "react";

import { MYPAGE_ROUTES } from "@trainer/constants/mypageRoute";

import { formatDateStringToKorean } from "@trainer/utils/avaliableScheduleUtils";

interface ScheduleChangeResultSheetProps {
  children: React.ReactNode;
  scheduleApplyAt?: string;
}

export default function ScheduleChangeResultSheet({
  children,
  scheduleApplyAt,
}: ScheduleChangeResultSheetProps) {
  const router = useRouter();

  const handleClickConfirm = () => {
    router.push(MYPAGE_ROUTES.MY_PAGE);
  };

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side={"bottom"}>
        <SheetHeader>
          <SheetTitle className="flex justify-center">
            <Icon name="Check" className="h-[3.125rem] w-[3.125rem]" background="brand" />
          </SheetTitle>
        </SheetHeader>
        <SheetDescription asChild>
          <div className="flex flex-col gap-[0.875rem] text-center">
            <p className="text-title-1">PT 수업 시간이 변경되었습니다.</p>
            <p className="text-body-1">{formatDateStringToKorean(scheduleApplyAt)}부터 적용돼요</p>
          </div>
        </SheetDescription>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"brand"} className="h-[2.5rem] w-full" onClick={handleClickConfirm}>
              확인
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
