import { ProfileItem } from "@ui/components/ProfileItem";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { ROUTE } from "../../_constants/route";

interface MemorizedProfileLinkProps {
  value: string;
}

export const MemorizedChangePhoneLink = React.memo(({ value }: MemorizedProfileLinkProps) => {
  const router = useRouter();

  const handleClickRoutingVerifyPhone = () => {
    router.push(ROUTE.VERIFY_PHONE);
  };

  return (
    <ProfileItem className="w-full" variant={"phone"} onClick={handleClickRoutingVerifyPhone}>
      <label>{value}</label>
      <div className="text-text-sub3 flex items-center">
        변경
        <ChevronRight size={25} />
      </div>
    </ProfileItem>
  );
});
MemorizedChangePhoneLink.displayName = "MemorizedChangePhoneLink";
