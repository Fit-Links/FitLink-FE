"use client";

import Profile from "@ui/components/ProfileHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import RouteInstance from "@user/constants/routes";

import LogoutButton from "./LogoutButton";

interface HeaderProps {
  userName: string;
  profilePictureUrl: string | null;
}

export default function ProfileHeader({ userName, profilePictureUrl }: HeaderProps) {
  const router = useRouter();

  const handleClickRouting = (path: string) => {
    router.push(path);
  };

  return (
    <section className="flex items-center justify-between">
      <Profile>
        <Profile.Section
          onClick={() => {
            handleClickRouting(RouteInstance["my-information"]());
          }}
        >
          <Profile.Avatar>
            <Image
              width={50}
              height={50}
              src={profilePictureUrl || ""}
              alt={`${userName} 프로필`}
            />
          </Profile.Avatar>
          <Profile.Name name={userName} />
        </Profile.Section>
      </Profile>

      <LogoutButton />
    </section>
  );
}
