"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/Avatar";
import { Button } from "@ui/components/Button";
import Header from "@ui/components/Header";
import { ProfileItem } from "@ui/components/ProfileItem";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/Sheet";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { MyInformationDetailApiResponse } from "@user/services/types/myInformation.dto";

import SheetItem from "@user/components/SheetItem";

export default function MyInfomation() {
  const router = useRouter();

  const handleClickBack = () => {
    router.push("/my-page");
  };

  const [mockData, setMockData] = useState<MyInformationDetailApiResponse["data"]>({
    memberId: 1,
    name: "홍길동",
    birthDate: "2024-05-12",
    phoneNumber: "010-2938-2312",
    profilePictureUrl: "https://github.com/shadcn.png",
  });

  const handleClickRoutingVerifyPhone = () => {
    const currentPath = window.location.pathname;
    router.push(`${currentPath}/verify-phone`);
  };

  const handleClickDeleteSelectImageFromAlbum = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];

      if (!file) return;

      const uri = URL.createObjectURL(file as Blob);
      setMockData({
        ...mockData,
        profilePictureUrl: uri,
      });
    };
    input.click();
  };

  const handleClickDeleteProfileImage = () => {
    setMockData({
      ...mockData,
      profilePictureUrl: "",
    });
  };

  return (
    <main className="flex h-screen w-full flex-col pb-[5.063rem]">
      <Header>
        <Header.Left>
          <Header.Back onClick={handleClickBack} />
        </Header.Left>
        <Header.Title content="내 정보" />
      </Header>
      <section className="mt-[1.563rem] flex flex-col items-center justify-center">
        <Avatar className="h-[6.313rem] w-[6.313rem]">
          <AvatarFallback />
          <AvatarImage src={mockData.profilePictureUrl} />
        </Avatar>

        <div className={"mt-[1.25rem]"}>
          <Sheet>
            <SheetTrigger asChild={true}>
              <Button variant={"brand"} size={"sm"} corners={"pill"}>
                {mockData.profilePictureUrl ? "프로필 사진 수정" : "프로필 사진 등록"}
              </Button>
            </SheetTrigger>
            <SheetContent side={"bottom"}>
              <SheetTitle></SheetTitle>
              <SheetDescription className="flex flex-col gap-[0.625rem]">
                <SheetClose asChild>
                  <SheetItem
                    icon="Image"
                    label="앨범에서 선택"
                    onClick={handleClickDeleteSelectImageFromAlbum}
                  />
                </SheetClose>
                <SheetClose asChild>
                  <SheetItem
                    icon="Trash2"
                    label="프로필 사진 삭제"
                    variant="danger"
                    onClick={handleClickDeleteProfileImage}
                  />
                </SheetClose>
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>

        <div className={"mt-[1.25rem] w-full"}>
          <ProfileItem variant={"name"}>
            <div className="flex h-full items-center gap-[0.625rem]">
              <label>{mockData.name}</label>
            </div>
          </ProfileItem>
          <ProfileItem variant={"birthday"}>
            <div className="flex h-full items-center gap-[0.625rem]">
              <label>{mockData.birthDate}</label>
            </div>
          </ProfileItem>
          <ProfileItem variant={"phone"} onClick={handleClickRoutingVerifyPhone}>
            <div className="flex h-full items-center gap-[0.625rem]">
              <span className="h-full">{mockData.phoneNumber}</span>
              <div className="flex items-center">
                <span>변경</span> <ChevronRight size={25} />
              </div>
            </div>
          </ProfileItem>
        </div>
      </section>
    </main>
  );
}
