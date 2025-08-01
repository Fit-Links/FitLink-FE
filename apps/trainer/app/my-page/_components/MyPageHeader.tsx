"use client";

import ProfileHeader from "@ui/components/ProfileHeader";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import RouteInstance from "@trainer/constants/route";

import LogoutButton from "./LogoutButton";

type MyPageHeaderProps = {
  name: string;
  imageSrc: string;
};
function MyPageHeader({ name, imageSrc }: MyPageHeaderProps) {
  return (
    <section className="flex w-full justify-between">
      <Link href={RouteInstance["my-information"]()}>
        <ProfileHeader>
          <ProfileHeader.Section onClick={() => {}}>
            <ProfileHeader.Avatar>
              <Image width={50} height={50} src={imageSrc || ""} alt={`${name} 프로필`} />
            </ProfileHeader.Avatar>
            <ProfileHeader.Name name={name} />
          </ProfileHeader.Section>
        </ProfileHeader>
      </Link>

      <LogoutButton />
    </section>
  );
}

export default MyPageHeader;
