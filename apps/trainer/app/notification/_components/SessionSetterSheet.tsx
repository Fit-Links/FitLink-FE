import { useSuspenseQuery } from "@tanstack/react-query";
import BrandSpinner from "@ui/components/BrandSpinner";
import { Button } from "@ui/components/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import Stepper from "@ui/components/Stepper";
import { Suspense, useState } from "react";

import { userManagementQueries } from "@trainer/queries/userManagement";

import QueryErrorBoundary from "@trainer/components/QueryErrorBoundary";

import SheetErrorFallback from "./SheetRenderer/SheetErrorFallback";

// eslint-disable-next-line no-magic-numbers
const INCREMENT_OPTIONS = [5, 10, 20];
const DEFAULT_SESSION = 0;

type SessionSetterSheetContentProps = {
  onSubmit: (totalCount: number, remainingCount: number) => void;
  memberId: number;
};

function SessionSetterSheetContent({ onSubmit, memberId }: SessionSetterSheetContentProps) {
  const { data } = useSuspenseQuery(userManagementQueries.detail(memberId));
  const { sessionInfo } = data.data;

  const [sessionValue, setSessionValue] = useState(DEFAULT_SESSION);

  const hasPreviousSession = sessionInfo?.remainingCount || sessionInfo?.totalCount;

  const handleSessionAdderHintClick = (value: number) => () => {
    setSessionValue((prev) => prev + value);
  };

  const handleSubmit = () => {
    onSubmit(sessionValue, sessionValue);
  };

  if (hasPreviousSession)
    return (
      <>
        <SheetHeader className="items-center">
          <SheetTitle>잔여 세션이 발견되었습니다</SheetTitle>
          <SheetDescription>
            이전 연동에서 추가된 세션 정보가 그대로 사용됩니다.
            <br />
            [회원관리] 탭에서 회원의 세션을 다시 설정하실 수 있습니다
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className="w-full">
          <SheetClose asChild>
            <Button size="xl" className="w-full">
              확인
            </Button>
          </SheetClose>
        </SheetFooter>
      </>
    );

  return (
    <>
      <SheetHeader className="items-center">
        <SheetTitle>PT 횟수 입력</SheetTitle>
        <SheetDescription>회원님의 PT 횟수를 입력하여 연동을 승인해주세요</SheetDescription>
      </SheetHeader>
      <div className="mb-[1.25rem] flex gap-2.5">
        {INCREMENT_OPTIONS &&
          INCREMENT_OPTIONS.map((value) => (
            <Button
              key={`increment-${value}`}
              variant="negative"
              className="text-headline h-[2rem] w-[4.875rem] rounded-full"
              onClick={handleSessionAdderHintClick(value)}
            >
              +{value}회
            </Button>
          ))}
      </div>
      <Stepper value={sessionValue} onChangeValue={setSessionValue} className="border-none" />
      <SheetFooter className="w-full">
        <SheetClose asChild>
          <Button size="xl" onClick={handleSubmit} className="w-full">
            승인
          </Button>
        </SheetClose>
      </SheetFooter>
    </>
  );
}

type SessionSetterSheetProps = {
  memberId: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (totalCount: number, remainingCount: number) => void;
};

function SessionSetterSheet({ memberId, isOpen, onOpenChange, onSubmit }: SessionSetterSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="md:w-mobile flex h-fit flex-col items-center md:inset-x-[calc((100%-30rem)/2)]"
      >
        <QueryErrorBoundary fallback={SheetErrorFallback}>
          <Suspense fallback={<BrandSpinner />}>
            <SessionSetterSheetContent onSubmit={onSubmit} memberId={memberId} />
          </Suspense>
        </QueryErrorBoundary>
      </SheetContent>
    </Sheet>
  );
}

export default SessionSetterSheet;
