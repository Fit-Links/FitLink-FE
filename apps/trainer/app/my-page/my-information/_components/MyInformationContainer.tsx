"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/Avatar";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { MyInformationApiResponse } from "@trainer/services/types/myInformation.dto";

import { MYPAGE_ROUTES } from "@trainer/constants/mypageRoute";

import EditProfileButton from "./EditProfileButton";
import { MemorizedProfileItem } from "./MemorizedProfileItem";
import Header from "../../_components/Header";

export default function MyInformationContainer() {
  const router = useRouter();

  const [mockData, setMockData] = useState<MyInformationApiResponse["data"]>({
    name: "홍길동",
    birthDate: "1998-12-11",
    phoneNumber: "01092832123",
    profileUrl: "https://github.com/shadcn.png",
  });

  const handleClickNavigate = useCallback((path: string) => {
    router.push(path);
  }, []);

  const handleChangeMyInformation = (
    key: keyof MyInformationApiResponse["data"],
    value: string,
  ) => {
    setMockData({
      ...mockData,
      [key]: value,
    });
  };

  return (
    <section className="bg-background-primary text-text-primary flex h-screen w-full flex-col items-center px-4">
      <Header title="내 정보" />

      <Avatar className="mt-[1.563rem] h-[6.313rem] w-[6.313rem]">
        <AvatarImage src={mockData.profileUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <EditProfileButton
        profileUrl={mockData.profileUrl}
        onChangeMyInformation={handleChangeMyInformation}
      />

      <MemorizedProfileItem className="mt-[1.25rem]" variant="name" value={mockData.name} />
      <MemorizedProfileItem variant="birthday" value={mockData.birthDate} />

      <MemorizedProfileItem variant="phone" value={mockData.phoneNumber}>
        <section
          className="text-text-sub3 flex items-center"
          onClick={() => handleClickNavigate(MYPAGE_ROUTES.VERIFICATION_PHONE)}
        >
          변경 <ChevronRight />
        </section>
      </MemorizedProfileItem>
    </section>
  );
}
