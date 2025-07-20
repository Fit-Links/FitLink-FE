"use client";

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
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { PtUser } from "@trainer/services/types/userManagement.dto";

import useSessionCountEditMutation from "../../_hooks/useSessionCountEditMutation";

type PtRemainingCountEditSheetProps = {
  value: number;
  onChangeClose: (isOpen: boolean) => void;
  selectedMemberInformation: PtUser;
};

function PtRemainingCountEditSheet({
  value,
  onChangeClose,
  selectedMemberInformation,
}: PtRemainingCountEditSheetProps) {
  const {
    memberId,
    sessionInfo: { remainingCount, totalCount, sessionInfoId },
  } = selectedMemberInformation;

  const isSessionEditErrorFirstRender = useRef(false);

  const [successSheetOpen, setSuccessSheetOpen] = useState(false);

  const { mutate: updatePtRemainingCount, isSuccess } = useSessionCountEditMutation();

  useEffect(() => {
    if (value > totalCount) {
      if (!isSessionEditErrorFirstRender.current) {
        toast.error("잔여 PT 횟수는 등록 PT 횟수보다 많을 수 없습니다.");

        isSessionEditErrorFirstRender.current = true;
      }

      return;
    }
  }, [value, totalCount]);

  const handleClick = () => {
    updatePtRemainingCount({
      memberId: memberId,
      sessionInfoId: sessionInfoId,
      editSessionCount: {
        remainingCount: value,
      },
    });
  };

  const handleClickCheckButton = () => {
    onChangeClose(false);
  };

  const checkDisabledButton = () => {
    return value === remainingCount || value > totalCount;
  };

  useEffect(() => {
    if (isSuccess) {
      setSuccessSheetOpen(true);
    }
  }, [isSuccess]);

  return (
    <Sheet open={successSheetOpen} onOpenChange={setSuccessSheetOpen}>
      <SheetTrigger asChild>
        <Button
          disabled={checkDisabledButton()}
          variant="brand"
          className="h-[3.375rem] w-full"
          onClick={handleClick}
        >
          변경
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
        <SheetHeader className="flex flex-col items-center">
          <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
            <Icon name="Check" size="lg" />
          </Button>
          <SheetTitle className="whitespace-pre-line text-center">{`홍길동 회원의\n잔여 PT 횟수가 변경되었습니다`}</SheetTitle>
          <SheetDescription>회원에게 잔여 PT 횟수({value}회) 알림이 전송돼요</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleClickCheckButton} className="h-[3.375rem] w-full">
              확인
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default PtRemainingCountEditSheet;
