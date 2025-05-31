"use client";

import Icon from "@ui/components/Icon";
import { ProfileItem, ProfileItemContent } from "@ui/components/ProfileItem";
import { cn } from "@ui/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

import { TrainerConnectStatus } from "@user/app/schedule-management/_types/addReservation";

import RouteInstance from "@user/constants/routes";

interface TrainerInformationProps {
  connectingStatus: TrainerConnectStatus | null;
  trainerName: string | null;
}

export default function ConnectedTrainerItem({
  connectingStatus,
  trainerName,
}: TrainerInformationProps) {
  const router = useRouter();

  const handleClickRouting = () => {
    if (connectingStatus === "CONNECTED") {
      router.push(RouteInstance["my-trainer-information"]());
    } else if (connectingStatus === "UNCONNECTED") {
      router.push(RouteInstance["connect-trainer"]());
    } else if (connectingStatus === "REQUESTED") {
      return;
    }
  };

  return (
    <ProfileItem variant="trainer">
      <ProfileItemContent>
        <div
          className={cn(
            "flex cursor-pointer items-center gap-0",
            connectingStatus === "CONNECTED" ? "text-text-sub2" : "text-text-primary",
          )}
          onClick={handleClickRouting}
        >
          {connectingStatus === "CONNECTED"
            ? trainerName
            : connectingStatus === "UNCONNECTED"
              ? "연동하기"
              : "요청중"}
          <Icon name="ChevronRight" size="lg" />
        </div>
      </ProfileItemContent>
    </ProfileItem>
  );
}
