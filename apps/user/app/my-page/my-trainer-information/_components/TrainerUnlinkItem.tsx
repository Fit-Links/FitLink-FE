"use client";

import { ProfileItem } from "@ui/components/ProfileItem";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

import UnlinkAlarmSheet from "./BottomSheet/UnlinkAlarmSheet";
import UnlinkDialog from "./Dialog";

export default function TrainerUnlinkItem() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);

  const handleClickUnlinkTrainer = () => {
    // TODO
    // 서버에 트레이너 연동 해제 요청
    // 요청 성공 시 모달 띄우기
    setIsOpenBottomSheet(true);
  };

  return (
    <>
      <UnlinkDialog onClickUnlinkTrainer={handleClickUnlinkTrainer}>
        <div className={"w-full"}>
          <ProfileItem variant={"unlink"}>
            <div className="flex h-full items-center gap-[0.625rem]">
              <div className="flex items-center">
                <ChevronRight />
              </div>
            </div>
          </ProfileItem>
        </div>
      </UnlinkDialog>

      <UnlinkAlarmSheet
        isOpenBottomSheet={isOpenBottomSheet}
        setIsOpenBottomSheet={setIsOpenBottomSheet}
      />
    </>
  );
}
