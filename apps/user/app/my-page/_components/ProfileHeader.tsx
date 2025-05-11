"use client";

import Profile from "@ui/components/ProfileHeader";
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
          <Profile.Avatar name={userName} imageSrc={profilePictureUrl ?? ""} />
          <Profile.Name name={userName} />
        </Profile.Section>
      </Profile>

      <LogoutButton />
    </section>
  );
}
