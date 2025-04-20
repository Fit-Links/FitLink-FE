import { ProfileItem, ProfileItemVariants } from "@ui/components/ProfileItem";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

import { MYPAGE_ROUTES } from "@trainer/constants/mypageRoute";

const NAVIGATE_ROUTE = {
  code: MYPAGE_ROUTES.CODE,
  phone: MYPAGE_ROUTES.VERIFICATION_PHONE,
  myInformation: MYPAGE_ROUTES.MY_INFORMATION,
  editMyWorkoutSchedules: MYPAGE_ROUTES.EDIT_WORKOUT_SCHEDULE,
} as const;

type NavigateProfileItemProps = {
  className?: string;
  variant: keyof typeof ProfileItemVariants;
};
export default function NavigateProfileItem({ className, variant }: NavigateProfileItemProps) {
  const router = useRouter();

  const handleClickRoute = useCallback(() => {
    router.push(NAVIGATE_ROUTE[variant as keyof typeof NAVIGATE_ROUTE]);
  }, [variant]);

  return (
    <ProfileItem className={className} variant={variant}>
      <ChevronRight onClick={handleClickRoute} />
    </ProfileItem>
  );
}
