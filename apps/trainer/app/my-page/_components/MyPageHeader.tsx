"use client";

import ProfileHeader from "@ui/components/ProfileHeader";
import { useRouter } from "next/navigation";
import React from "react";

import RouteInstance from "@trainer/constants/route";

import LogoutButton from "./LogoutButton";

type MyPageHeaderProps = {
  name: string;
  imageSrc: string;
};
function MyPageHeader({ name, imageSrc }: MyPageHeaderProps) {
  const router = useRouter();

  const handleClickLogout = (page: string) => {
    router.push(page);
  };

  return (
    <section className="flex w-full justify-between">
      <ProfileHeader>
        <ProfileHeader.Section onClick={() => handleClickLogout(RouteInstance["my-information"]())}>
          <ProfileHeader.Avatar name={name} imageSrc={imageSrc} />
          <ProfileHeader.Name name={name} />
        </ProfileHeader.Section>
      </ProfileHeader>

      <LogoutButton />
    </section>
  );
}

export default MyPageHeader;
