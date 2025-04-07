import { cn } from "@ui/lib/utils";
import { ComponentProps, ReactNode } from "react";

import ProfileCard from "@trainer/components/ProfileCard";

type MemberProfileCardProps = ComponentProps<typeof ProfileCard> & {
  memberId: number;
  children?: ReactNode;
};
function MemberProfileCard({
  memberId,
  userName,
  userBirth,
  phoneNumber,
  imgUrl,
  PTReservationOtherTime,
  className,
  children,
  ...props
}: MemberProfileCardProps) {
  return (
    <ProfileCard
      key={`${memberId}-${name}`}
      imgUrl={imgUrl}
      userBirth={userBirth}
      userName={userName}
      phoneNumber={phoneNumber}
      className={cn("w-full", className)}
      PTReservationOtherTime={PTReservationOtherTime}
      {...props}
    >
      {children}
    </ProfileCard>
  );
}

export default MemberProfileCard;
