"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/Sheet";
import { VisuallyHidden } from "@ui/components/VisuallyHidden";
import { useRouter } from "next/navigation";

import SheetItem from "@user/components/SheetItem";

import RouteInstance from "@user/constants/routes";

type EditPreferredScheduleBottomSheetProps = {
  children: React.ReactNode;
};

export default function EditPreferredScheduleBottomSheet({
  children,
}: EditPreferredScheduleBottomSheetProps) {
  const navigate = useRouter();

  const handleClickOpenAlbum = () => {
    navigate.push(RouteInstance["edit-workout-schedules"]());
  };

  return (
    <div className="md:max-w-mobile absolute right-0 top-0">
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent side="bottom" className="md:w-mobile md:inset-x-[calc((100%-480px)/2)] ">
          <VisuallyHidden>
            <SheetTitle>PT 희망시간 수정</SheetTitle>
            <SheetDescription>이 시트에서 PT 희망시간을 수정할 수 있습니다.</SheetDescription>
          </VisuallyHidden>
          <SheetClose asChild>
            <SheetItem icon="Pencil" label="PT 희망시간 수정" onClick={handleClickOpenAlbum} />
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}
