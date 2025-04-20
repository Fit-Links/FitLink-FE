"use client";

import { Button } from "@ui/components/Button";
import { useRouter } from "next/navigation";

import { PtUser } from "@trainer/services/types/userManagement.dto";

import RouteInstance from "@trainer/constants/route";

type SelectTimeRouteButtonProps = {
  selectedMemberInformation: PtUser | null;
};

function SelectTimeRouteButton({ selectedMemberInformation }: SelectTimeRouteButtonProps) {
  const router = useRouter();

  const handleClickRoute = () => {
    router.push(
      RouteInstance["select-pt-times"]("", {
        memberInformation: encodeURIComponent(JSON.stringify(selectedMemberInformation as PtUser)),
      }),
    );
  };

  return (
    <Button
      className="h-[3.375rem] w-full rounded-[0.625rem]"
      disabled={selectedMemberInformation === null}
      onClick={handleClickRoute}
    >
      예약
    </Button>
  );
}

export default SelectTimeRouteButton;
