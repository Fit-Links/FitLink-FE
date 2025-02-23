import React, { forwardRef } from "react";

import { cn } from "@ui/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import ChevronTrigger from "./ChevronTrigger";
import { Text } from "./Text";

type ProfileHeaderProps = {
  children: React.ReactNode;
};
const ProfileHeaderRoot = React.forwardRef<HTMLDivElement, ProfileHeaderProps>(
  ({ children }, ref) => (
    <div className="flex items-center justify-between" ref={ref}>
      {children}
    </div>
  ),
);
ProfileHeaderRoot.displayName = "ProfileHeaderRoot";

type ProfileHeaderSectionProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
const ProfileHeaderSection = React.forwardRef<HTMLDivElement, ProfileHeaderSectionProps>(
  ({ children, className, onClick }, ref) => {
    if (onClick)
      return (
        <ChevronTrigger onClick={onClick} position="right" ref={ref} className="">
          <div className={cn("flex w-fit items-center gap-[1rem]", className)}>{children}</div>
        </ChevronTrigger>
      );

    return <div className={cn("flex w-fit items-center gap-[1rem]", className)}>{children}</div>;
  },
);
ProfileHeaderSection.displayName = "ProfileHeaderSection";

type ProfileHeaderAvatarProps = {
  name: string;
  imageSrc: string;
};
const ProfileHeaderAvatar = forwardRef<React.ElementRef<typeof Avatar>, ProfileHeaderAvatarProps>(
  ({ name, imageSrc }, ref) => {
    return (
      <Avatar ref={ref}>
        <AvatarImage src={imageSrc} alt={`${name}님 프로필`} />
        <AvatarFallback />
      </Avatar>
    );
  },
);
ProfileHeaderAvatar.displayName = "ProfileHeaderAvatar";

type ProfileHeaderNameProps = {
  name: string;
};
function ProfileHeaderName({ name }: ProfileHeaderNameProps) {
  return <Text.Title2>{name}</Text.Title2>;
}

const ProfileHeader = Object.assign(ProfileHeaderRoot, {
  Section: ProfileHeaderSection,
  Avatar: ProfileHeaderAvatar,
  Name: ProfileHeaderName,
});

export default ProfileHeader;
