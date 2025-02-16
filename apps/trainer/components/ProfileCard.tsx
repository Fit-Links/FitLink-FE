import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/Avatar";
import { Badge } from "@ui/components/Badge";
import Icon from "@ui/components/Icon";
import { cn } from "@ui/lib/utils";
import { ReactNode } from "react";

import { formatToMeridiem } from "@trainer/utils/ProfileCardUtils";

type ProfileCardProps = {
  className?: string;
  imgUrl: string;
  userName: string;
  userBirth: Date;
  phoneNumber: string;
  PTReservationOtherTime?: string;
  ellipsIcon?: boolean;
  children?: ReactNode;
};

type UserInfoProps = Pick<
  ProfileCardProps,
  "imgUrl" | "userName" | "phoneNumber" | "PTReservationOtherTime"
> & {
  userAge: number;
};

type ContentProps = Pick<ProfileCardProps, "PTReservationOtherTime" | "children">;

const AGE_OFFSET_KOREAN = 1;
const CURRENT_YEAR = new Date().getFullYear();

function UserInfo({
  imgUrl,
  userAge,
  userName,
  phoneNumber,
  PTReservationOtherTime,
}: UserInfoProps) {
  const parsedPTReservationOtherTime =
    PTReservationOtherTime && formatToMeridiem(PTReservationOtherTime);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[3.125rem] w-[11.25rem] items-center">
        <div className="flex h-full w-[5rem] items-center justify-center">
          <Avatar>
            <AvatarImage src={imgUrl} />
            <AvatarFallback />
          </Avatar>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-start gap-[0.438rem]">
            <span className="text-headline">{userName}</span>
            <span className="text-body-3 text-text-sub3">{userAge}세</span>
          </div>
          <span className="text-body-3">{phoneNumber}</span>
        </div>
      </div>
      {parsedPTReservationOtherTime && (
        <Badge variant="brand" className="ml-[5rem] mt-[0.625rem] h-[2rem] w-[5.25rem]">
          {parsedPTReservationOtherTime}
        </Badge>
      )}
    </div>
  );
}

function Content({ PTReservationOtherTime, children }: ContentProps) {
  return (
    <div
      className={cn(
        "flex flex-1 justify-end",
        PTReservationOtherTime ? "min-h-[5.625rem] items-start" : "min-h-[3.125rem] items-center",
      )}
    >
      {children}
    </div>
  );
}

function MenuIcon() {
  // TODO: MenuIcon 핸들러 추가
  return (
    <Icon
      name="Ellipsis"
      className="text-text-sub3 absolute right-1 top-0.5"
      aria-label="프로필 카드 메뉴 버튼"
      size="lg"
    />
  );
}

export default function ProfileCard({
  className,
  imgUrl,
  userName,
  userBirth,
  phoneNumber,
  PTReservationOtherTime,
  ellipsIcon,
  children,
}: ProfileCardProps) {
  const userAge = CURRENT_YEAR - userBirth.getFullYear() + AGE_OFFSET_KOREAN;

  return (
    <section
      className={cn(
        "bg-background-sub2 text-text-primary hover:bg-background-sub3 relative flex min-h-[5.625rem] w-[22.375rem] items-center rounded-[0.625rem] py-[1.25rem] pr-2 transition-colors",
        className,
      )}
    >
      <UserInfo
        imgUrl={imgUrl}
        userName={userName}
        userAge={userAge}
        phoneNumber={phoneNumber}
        PTReservationOtherTime={PTReservationOtherTime}
      />
      <Content PTReservationOtherTime={PTReservationOtherTime}>{children}</Content>
      {ellipsIcon && <MenuIcon />}
    </section>
  );
}
