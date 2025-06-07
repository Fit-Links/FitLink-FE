"use client";

import { Avatar, AvatarFallback } from "@ui/components/Avatar";
import Image from "next/image";
import React from "react";

interface ProfileImageProps {
  name: string;
  profilePictureUrl: string | null;
}

function ProfileImage({ name, profilePictureUrl }: ProfileImageProps) {
  return (
    <Avatar className=" mt-[1.563rem] h-[6.313rem] w-[6.313rem]">
      {profilePictureUrl ? (
        <Image
          width={50}
          height={50}
          src={profilePictureUrl}
          alt={`${name} 프로필`}
          className="h-full w-full"
        />
      ) : (
        <AvatarFallback />
      )}
    </Avatar>
  );
}

export default ProfileImage;
