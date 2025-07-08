"use client";

import BrandSpinner from "@ui/components/BrandSpinner";
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
import { VisuallyHidden } from "@ui/components/VisuallyHidden";

type MutationStatusSheetProps = {
  status: "pending" | "error" | "success" | "idle";
};

function MutationStatusSheet({ status }: MutationStatusSheetProps) {
  return (
    <>
      <Sheet open={status === "pending"}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader>
            <SheetTitle>요청 중입니다</SheetTitle>
            <SheetDescription>잠시만 기다려주세요</SheetDescription>
          </SheetHeader>
          <div className="flex items-center justify-center">
            <BrandSpinner />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={status === "success"}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader>
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle>요청이 완료되었습니다</SheetTitle>
            <VisuallyHidden>
              <SheetDescription>요청이 완료되었음을 알려주는 시트입니다</SheetDescription>
            </VisuallyHidden>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button className="w-full">확인</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default MutationStatusSheet;
