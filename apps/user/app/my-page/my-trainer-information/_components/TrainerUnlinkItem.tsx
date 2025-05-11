"use client";

import { useMutation } from "@tanstack/react-query";
import Icon from "@ui/components/Icon";
import { ProfileItem } from "@ui/components/ProfileItem";
import React, { useState } from "react";

import { disconnectTrainer } from "@user/services/myInformation";

import UnlinkAlarmSheet from "./BottomSheet/UnlinkAlarmSheet";
import UnlinkDialog from "./Dialog";

export default function TrainerUnlinkItem() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);

  const { mutate, isSuccess } = useMutation({
    mutationFn: () => disconnectTrainer(),
  });

  const handleClickUnlinkTrainer = () => {
    mutate(undefined, {
      onSuccess: () => {
        if (isSuccess) {
          setIsOpenBottomSheet(true);
        }
      },
    });
  };

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
    </>
  );
}
