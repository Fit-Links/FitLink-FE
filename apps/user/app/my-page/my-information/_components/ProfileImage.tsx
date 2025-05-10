"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/Avatar";
import React from "react";

interface ProfileImageProps {
  profilePictureUrl: string | null;
}

function ProfileImage({ profilePictureUrl }: ProfileImageProps) {
  return (
    <Avatar className=" mt-[1.563rem] h-[6.313rem] w-[6.313rem]">
      <AvatarFallback />
      <AvatarImage src={profilePictureUrl ?? ""} />
    </Avatar>
  );
}

export default ProfileImage;
