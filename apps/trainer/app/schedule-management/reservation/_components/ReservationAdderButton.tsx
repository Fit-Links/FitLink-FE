"use client";

import { Button } from "@ui/components/Button";
import Icon from "@ui/components/Icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/Sheet";
import React from "react";

import { PtUser } from "@trainer/services/types/userManagement.dto";

type ReservationAdderButtonProps = {
  selectedMemberInformation: PtUser | null;
};

function ReservationAdderButton({ selectedMemberInformation }: ReservationAdderButtonProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="h-[3.375rem] w-full rounded-[0.625rem]"
          disabled={selectedMemberInformation === null}
        >
          예약
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
        <SheetHeader className="flex flex-col items-center">
          <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
            <Icon name="Check" size="lg" />
          </Button>
          <SheetTitle className="whitespace-pre-line text-center">
            {`${selectedMemberInformation?.name} 회원의\n예약이 확정되었습니다`}
          </SheetTitle>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="h-[3.375rem] w-full rounded-[0.625rem]">확인</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ReservationAdderButton;
