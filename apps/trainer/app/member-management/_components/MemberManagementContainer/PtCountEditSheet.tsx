/* eslint-disable no-magic-numbers */
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
} from "@ui/components/Sheet";
import Stepper from "@ui/components/Stepper";
import React, { useEffect, useState } from "react";

import { PtUser } from "@trainer/services/types/userManagement.dto";

import useSessionCountEditMutation from "../../_hooks/useSessionCountEditMutation";

const PT_EDIT_COUNT_LIST = [10, 20, -10, -20];

type PtCountEditSheetProps = {
  open: boolean;
  selectedMemberInformation: PtUser;
  onChangeOpen: (isOpen: boolean) => void;
};

function PtCountEditSheet({
  open,
  selectedMemberInformation,
  onChangeOpen,
}: PtCountEditSheetProps) {
  const {
    memberId,
    sessionInfo: { remainingCount, totalCount, sessionInfoId },
    name,
  } = selectedMemberInformation;

  const [isPtCountEditSuccessSheet, setIsPtCountEditSuccessSheet] = useState(false);
  const [ptRemainingCount, setPtRemainingCount] = useState(remainingCount);
  const [ptTotalCount, setPtTotalCount] = useState(totalCount);

  const { mutate: updatePtRemainingCount, isSuccess: isPtCountEditSuccess } =
    useSessionCountEditMutation();

  const handleClickEditSubmitButton = () => {
    updatePtRemainingCount({
      memberId: memberId,
      sessionInfoId: sessionInfoId,
      editSessionCount: {
        totalCount: ptTotalCount,
        remainingCount: ptRemainingCount,
      },
    });
  };

  const handleChangeRemainingCount = (value: number) => {
    if (value < 0 || value > ptTotalCount) {
      return;
    }

    setPtRemainingCount(value);
  };

  const handleChangeTotalCount = (value: number) => {
    if (value < 0 || value < ptRemainingCount) {
      return;
    }

    setPtTotalCount(value);
  };

  const handleChangeAllCount = (value: number) => () => {
    if (ptTotalCount + value < 0 || ptRemainingCount + value < 0) {
      setPtRemainingCount(0);
      setPtTotalCount(0);

      return;
    }

    setPtRemainingCount((prev) => prev + value);
    setPtTotalCount((prev) => prev + value);
  };

  const handleClickResetButton = () => {
    setPtRemainingCount(remainingCount);
    setPtTotalCount(totalCount);
  };

  const checkDisabledButton = () => {
    return ptRemainingCount > ptTotalCount || ptRemainingCount < 0 || ptTotalCount < 0;
  };

  useEffect(() => {
    if (isPtCountEditSuccess) {
      setIsPtCountEditSuccessSheet(true);
    }
  }, [isPtCountEditSuccess]);

  useEffect(() => {
    setPtRemainingCount(remainingCount);
    setPtTotalCount(totalCount);
  }, [selectedMemberInformation]);

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent
          side={"bottom"}
          className={
            "md:max-w-mobile left-1/2 flex h-fit w-full -translate-x-1/2 flex-col items-center"
          }
        >
          <SheetHeader className="flex items-center justify-center gap-2">
            <SheetTitle>PT 횟수 변경</SheetTitle>
            <div className="flex items-center justify-center gap-2">
              {PT_EDIT_COUNT_LIST.map((value) => (
                <Button
                  key={value}
                  variant={"negative"}
                  onClick={handleChangeAllCount(value)}
                  className="text-headline h-[2rem] w-[4.875rem] rounded-full"
                >
                  {value > 0 ? `+${value}회` : `${value}회`}
                </Button>
              ))}
              <Button
                variant={"destructive"}
                className="text-headline h-[2rem] w-[4.875rem] rounded-full"
                onClick={handleClickResetButton}
              >
                초기화
              </Button>
            </div>
          </SheetHeader>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-center gap-2">
              <div className="w-24 text-right">잔여 PT 횟수</div>
              <Stepper value={ptRemainingCount} onChangeValue={handleChangeRemainingCount} />
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-24 text-right">총 PT 횟수</div>
              <Stepper value={ptTotalCount} onChangeValue={handleChangeTotalCount} />
            </div>
          </div>
          <SheetFooter className="w-full">
            <SheetClose asChild>
              <Button
                disabled={checkDisabledButton()}
                className="h-[3.375rem] w-full"
                onClick={handleClickEditSubmitButton}
              >
                변경
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={isPtCountEditSuccessSheet} onOpenChange={setIsPtCountEditSuccessSheet}>
        <SheetContent side="bottom" className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader className="flex flex-col items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="whitespace-pre-line text-center">{`${name} 회원의\nPT 횟수가 변경되었습니다`}</SheetTitle>
            <SheetDescription>{`${name} 회원님에게 PT 횟수 변경 알림이 전송돼요`}</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button className="h-[3.375rem] w-full">확인</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default PtCountEditSheet;
