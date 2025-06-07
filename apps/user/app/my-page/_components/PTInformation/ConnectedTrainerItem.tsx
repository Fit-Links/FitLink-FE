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
    } else if (connectingStatus === "UNCONNECTED" || !connectingStatus) {
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
            "flex  items-center gap-0",
            connectingStatus === "CONNECTED" ? "text-text-sub2" : "text-text-primary",
            connectingStatus !== "REQUESTED" && "cursor-pointer",
          )}
          onClick={handleClickRouting}
        >
          {connectingStatus === "UNCONNECTED" || !connectingStatus ? (
            "연동하기"
          ) : connectingStatus === "CONNECTED" ? (
            trainerName
          ) : (
            <span className="text-brand-primary-500 font-bold">연동 요청 상태</span>
          )}
          {connectingStatus !== "REQUESTED" && <Icon name="ChevronRight" size="lg" />}
        </div>
      </ProfileItemContent>
    </ProfileItem>
  );
}
