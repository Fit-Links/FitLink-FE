"use client";

import ProfileHeader from "@ui/components/ProfileHeader";
import { useRouter } from "next/navigation";
import React from "react";

import { MYPAGE_ROUTES } from "@trainer/constants/mypageRoute";

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
        <ProfileHeader.Section onClick={() => handleClickLogout(MYPAGE_ROUTES.MY_INFORMATION)}>
          <ProfileHeader.Avatar name={name} imageSrc={imageSrc} />
          <ProfileHeader.Name name={name} />
        </ProfileHeader.Section>
      </ProfileHeader>

      <LogoutButton />
    </section>
  );
}

export default MyPageHeader;
