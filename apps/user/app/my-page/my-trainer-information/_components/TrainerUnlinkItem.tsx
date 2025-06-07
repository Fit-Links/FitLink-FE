"use client";

import Icon from "@ui/components/Icon";
import { ProfileItem } from "@ui/components/ProfileItem";
import React, { useEffect, useState } from "react";

import UnlinkAlarmSheet from "./BottomSheet/UnlinkAlarmSheet";
import UnlinkDialog from "./Dialog";
import MyPagePending from "../../_components/MyPagePending";
import useUnlinkTrainerMutation from "../_hooks/useUnlinkTrainerMutation";

export default function TrainerUnlinkItem() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);

  const { unlinkTrainer, isSuccess, isPending } = useUnlinkTrainerMutation();

  const handleClickUnlinkTrainer = () => {
    unlinkTrainer(undefined);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpenBottomSheet(true);
    }
  }, [isSuccess]);

  return (
    <>
      <UnlinkDialog onClickUnlinkTrainer={handleClickUnlinkTrainer}>
        <div className={"w-full"}>
          <ProfileItem variant={"unlink"}>
            <div className="flex h-full items-center gap-[0.625rem]">
              <div className="flex items-center">
                <Icon name="ChevronRight" className="cursor-pointer" size="lg" />
              </div>
            </div>
          </ProfileItem>
        </div>
      </UnlinkDialog>

      <UnlinkAlarmSheet
        isOpenBottomSheet={isOpenBottomSheet}
        setIsOpenBottomSheet={setIsOpenBottomSheet}
      />
      {isPending && <MyPagePending />}
    </>
  );
}
