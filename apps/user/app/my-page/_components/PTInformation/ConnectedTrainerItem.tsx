import { ProfileItem, ProfileItemContent } from "@ui/components/ProfileItem";
import { cn } from "@ui/lib/utils";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { ROUTE } from "../../_constants/route";

interface TrainerInformationProps {
  trainerName: string;
}

export default function ConnectedTrainerItem({ trainerName }: TrainerInformationProps) {
  const router = useRouter();

  const handleClickRouting = (path: string) => {
    router.push(path);
  };

  return (
    <ProfileItem variant="trainer">
      <ProfileItemContent className="cursor-pointer">
        <div
          className={cn(
            "flex items-center gap-0",
            trainerName ? "text-text-sub2" : "text-text-primary",
          )}
          onClick={() => {
            trainerName
              ? handleClickRouting(ROUTE.MY_TRAINER_INFORMATION)
              : handleClickRouting(ROUTE.CONNECT_TRAINER);
          }}
        >
          {trainerName ? trainerName : "연동하기"}
          <ChevronRight />
        </div>
      </ProfileItemContent>
    </ProfileItem>
  );
}
