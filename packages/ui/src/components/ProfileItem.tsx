import { Cake, CalendarMinus2, Code, Dumbbell, Phone, User, UserRoundX } from "lucide-react";
import { ComponentProps, ReactNode } from "react";

import { cn } from "@ui/lib/utils";

const ProfileItemVariants = {
  calendar: {
    icon: <CalendarMinus2 />,
    content: "휴무일 설정",
  },
  birthday: {
    icon: <Cake />,
    content: "생년월일",
  },
  name: {
    icon: <User />,
    content: "이름",
  },
  trainer: {
    icon: <User />,
    content: "트레이너",
  },
  dumbbell: {
    icon: <Dumbbell />,
    content: "PT 횟수",
  },
  phone: {
    icon: <Phone />,
    content: "휴대폰 번호",
  },
  code: {
    icon: <Code />,
    content: "트레이너 코드",
  },
  unlink: {
    icon: <UserRoundX />,
    content: "트레이너 연동 해제",
  },
};

type ProfileItemProps = ComponentProps<"div"> & {
  variant: keyof typeof ProfileItemVariants;
};

function ProfileItem({ className, variant, ...props }: ProfileItemProps) {
  return (
    <div
      className={cn(
        `bg-background-primary relative flex min-h-[2.813rem] min-w-[22.375rem] items-center justify-between`,
        className,
      )}
      {...props}
    >
      <section className="flex">
        <ProfileItemIcon icon={ProfileItemVariants[variant].icon} />
        <ProfileItemHeader content={ProfileItemVariants[variant].content} />
      </section>
      <ProfileItemContent>{props.children}</ProfileItemContent>
    </div>
  );
}

type ProfileItemIconProps = {
  icon: ReactNode;
} & ComponentProps<"div">;

function ProfileItemIcon({ icon, className, ...props }: ProfileItemIconProps) {
  return (
    <div
      className={cn(
        `text-text-primary mr-[0.938rem] aspect-square h-[1.563rem] w-[1.563rem]`,
        className,
      )}
      {...props}
    >
      {icon}
    </div>
  );
}

type ProfileItemHeaderProps = {
  content: string;
} & ComponentProps<"div">;

function ProfileItemHeader({ content, className, ...props }: ProfileItemHeaderProps) {
  return (
    <div
      className={cn(
        `text-headline text-text-primary flex items-center text-[1.063rem] leading-[1.375rem]`,
        className,
      )}
      {...props}
    >
      {content}
    </div>
  );
}

type ProfileItemContentProps = ComponentProps<"div">;

function ProfileItemContent({ className, ...props }: ProfileItemContentProps) {
  return (
    <div
      className={cn(
        `text-text-sub2 flex items-center gap-[0.625rem] text-[0.938rem] leading-[1.375rem]`,
        className,
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}

export { ProfileItem, ProfileItemIcon, ProfileItemHeader, ProfileItemContent };
