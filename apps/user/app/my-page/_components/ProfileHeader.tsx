import Profile from "@ui/components/ProfileHeader";
import { useRouter } from "next/navigation";
import React from "react";

import { MyInformationApiResponse } from "@user/services/types/myInformation.dto";

import RouteInstance from "@user/constants/routes";

import LogoutButton from "./LogoutButton";

interface HeaderProps {
  userInformation: MyInformationApiResponse["data"];
}

export default function ProfileHeader({ userInformation }: HeaderProps) {
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
          <Profile.Avatar name="홍길동" imageSrc={userInformation.profilePictureUrl} />
          <Profile.Name name="홍길동" />
        </Profile.Section>
      </Profile>

      <LogoutButton />
    </section>
  );
}
