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

interface UnlinkAlarmSheetProps {
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: (isOpenBottomSheet: boolean) => void;
}

export default function UnlinkAlarmSheet({
  isOpenBottomSheet,
  setIsOpenBottomSheet,
}: UnlinkAlarmSheetProps) {
  const router = useRouter();

  const handleClickSheetClose = () => {
    router.back();
  };

  return (
    <Sheet open={isOpenBottomSheet} onOpenChange={setIsOpenBottomSheet}>
      <SheetTrigger></SheetTrigger>
      <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
        <SheetHeader>
          <SheetTitle className="flex justify-center">
            <Icon name="Check" className="h-[3.125rem] w-[3.125rem]" background="brand" />
          </SheetTitle>
        </SheetHeader>
        <SheetDescription asChild>
          <div className="flex flex-col gap-[0.875rem] text-center">
            <p className="text-title-1">트레이너와 연동 해제되었습니다</p>
            <p className="text-body-1">트레이너에게 연동 해제 알람이 전송돼요</p>
          </div>
        </SheetDescription>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"brand"} className="h-[2.5rem] w-full" onClick={handleClickSheetClose}>
              확인
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
