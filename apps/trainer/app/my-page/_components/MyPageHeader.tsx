"use client";

import ProfileHeader from "@ui/components/ProfileHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import RouteInstance from "@trainer/constants/route";

import LogoutButton from "./LogoutButton";

type MyPageHeaderProps = {
  name: string;
  imageSrc: string;
};

export default function MyPageHeader({ name, imageSrc }: MyPageHeaderProps) {
  const router = useRouter();

  const handleClickRoutingMyInformation = () => {
    router.push(RouteInstance["my-information"]());
  };

  return (
    <section className="flex w-full justify-between">
      <ProfileHeader>
        <ProfileHeader.Section onClick={handleClickRoutingMyInformation}>
          <ProfileHeader.Avatar>
            <Image width={50} height={50} src={imageSrc || ""} alt={`${name} 프로필`} />
          </ProfileHeader.Avatar>
          <ProfileHeader.Name name={name} />
        </ProfileHeader.Section>
      </ProfileHeader>
      <LogoutButton />
    </section>
  );
}
