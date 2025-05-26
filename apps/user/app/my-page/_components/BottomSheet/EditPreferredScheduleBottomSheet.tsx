"use client";

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@ui/components/Sheet";
import { useRouter } from "next/navigation";
import React from "react";

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
        <SheetContent side="bottom" className="md:max-w-mobile left-1/2 w-full -translate-x-1/2 ">
          <SheetClose asChild>
            <SheetTitle>
              <SheetItem icon="Pencil" label="PT 희망시간 수정" onClick={handleClickOpenAlbum} />
            </SheetTitle>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}
