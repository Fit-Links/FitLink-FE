"use client";

import Icon from "@ui/components/Icon";
import { ProfileItem } from "@ui/components/ProfileItem";
import { useRouter } from "next/navigation";
import React from "react";

type ProfileItemForRoutingProps = {
  variant: "code" | "calendar";
  url: string;
};

export default function ProfileItemForRouting({ variant, url }: ProfileItemForRoutingProps) {
  const router = useRouter();

  const handleClickRouting = () => {
    router.push(url);
  };

  return (
    <ProfileItem variant={variant}>
      <Icon name="ChevronRight" size="lg" onClick={handleClickRouting} />
    </ProfileItem>
  );
}
