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
import { useRouter } from "next/navigation";
import React from "react";

import RouteInstance from "@user/constants/routes";

interface SuccessEditPreferenceTimeBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
function SuccessEditPreferenceTimeBottomSheet({
  open,
  onOpenChange,
}: SuccessEditPreferenceTimeBottomSheetProps) {
  const router = useRouter();

  const handleClickClose = () => {
    router.push(RouteInstance["my-page"]());
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger></SheetTrigger>
      <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
        <SheetHeader>
          <SheetTitle className="flex justify-center">
            <Icon name="Check" className="h-[3.125rem] w-[3.125rem]" background="brand" />
          </SheetTitle>
        </SheetHeader>
        <SheetDescription asChild>
          <div className="flex flex-col gap-[0.875rem] text-center">
            <p className="text-title-1">회원의 PT 희망 시간이</p>
            <p className="text-title-1">수정되었습니다.</p>
          </div>
        </SheetDescription>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"brand"} className="h-[2.5rem] w-full" onClick={handleClickClose}>
              확인
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default SuccessEditPreferenceTimeBottomSheet;
