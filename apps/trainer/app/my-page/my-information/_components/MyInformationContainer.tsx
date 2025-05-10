"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/Avatar";
import { Button } from "@ui/components/Button";

import { myInformationQueries } from "@trainer/queries/myInformation";

import { MemorizedProfileItem } from "./MemorizedProfileItem";
import Header from "../../_components/Header";
import { getFormattedPhoneNumber } from "../_utils/getFormattedPhoneNumber";
import EditProfileBottomSheet from "./BottomSheet/EditProfileBottomSheet";

export default function MyInformationContainer() {
  const { data: myDetailInformation } = useSuspenseQuery(myInformationQueries.myInformation());

  return (
    <section className="bg-background-primary text-text-primary flex h-screen w-full flex-col items-center">
      <Header title="내 정보" />

      <Avatar className="mt-[1.563rem] h-[6.313rem] w-[6.313rem]">
        <AvatarImage src={myDetailInformation.profileUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <EditProfileBottomSheet>
        <Button className="mt-[1.25rem]" variant={"brand"} size={"sm"} corners={"pill"}>
          {myDetailInformation.profileUrl ? "프로필 사진 수정" : "프로필 사진 등록"}
        </Button>
      </EditProfileBottomSheet>

      <MemorizedProfileItem
        className="mt-[1.25rem]"
        variant="name"
        value={myDetailInformation.name}
      />
      <MemorizedProfileItem variant="birthday" value={myDetailInformation.birthDate} />

      <MemorizedProfileItem
        variant="phone"
        value={getFormattedPhoneNumber(myDetailInformation.phoneNumber)}
      >
        {/* <section className="text-text-sub3 flex items-center" onClick={handleChangePhoneNumber}>
          변경 <Icon name="ChevronRight" size="lg" />
        </section> */}
      </MemorizedProfileItem>
    </section>
  );
}
