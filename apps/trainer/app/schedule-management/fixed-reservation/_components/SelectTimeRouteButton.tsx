"use client";

import { Button } from "@ui/components/Button";
import { usePathname, useRouter } from "next/navigation";

import { PtUser } from "@trainer/services/types/userManagement.dto";

import { ROUTES } from "@trainer/constants/route";

type SelectTimeRouteButtonProps = {
  selectedMemberInformation: PtUser | null;
};

function SelectTimeRouteButton({ selectedMemberInformation }: SelectTimeRouteButtonProps) {
  const router = useRouter();
  const pathName = usePathname();

  const handleClickRoute = () => {
    router.push(
      `${pathName}${ROUTES.SELECT_PT_TIMES}?memberInformation=${encodeURIComponent(JSON.stringify(selectedMemberInformation as PtUser))}`,
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
