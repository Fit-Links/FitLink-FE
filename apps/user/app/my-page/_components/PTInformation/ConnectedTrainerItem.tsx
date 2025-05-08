"use client";

import Icon from "@ui/components/Icon";
import { ProfileItem, ProfileItemContent } from "@ui/components/ProfileItem";
import { cn } from "@ui/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

import RouteInstance from "@user/constants/routes";

interface TrainerInformationProps {
  trainerId: number | null;
  trainerName: string | null;
}

export default function ConnectedTrainerItem({ trainerId, trainerName }: TrainerInformationProps) {
  const router = useRouter();

  const handleClickRouting = (path: string) => {
    router.push(path);
  };

  return (
    <ProfileItem variant="trainer">
      <ProfileItemContent>
        <div
          className={cn(
            "flex items-center gap-0",
            trainerId ? "text-text-sub2" : "text-text-primary",
          )}
          onClick={() => {
            handleClickRouting(
              trainerId
                ? RouteInstance["my-trainer-information"]()
                : RouteInstance["connect-trainer"](),
            );
          }}
        >
          {trainerId ? trainerName : "연동하기"}
          <Icon name="ChevronRight" className="cursor-pointer" size="lg" />
        </div>
      </ProfileItemContent>
    </ProfileItem>
  );
}
