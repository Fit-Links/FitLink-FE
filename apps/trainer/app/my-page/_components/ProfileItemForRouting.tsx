"use client";

import { ProfileItem } from "@ui/components/ProfileItem";
import { ChevronRight } from "lucide-react";
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
      <ChevronRight onClick={handleClickRouting} />
    </ProfileItem>
  );
}
