import { cn } from "@ui/lib/utils";
import React from "react";

import { PtUser, PtUserListApiResponse } from "@trainer/services/types/userManagement.dto";

import ProfileCard from "@trainer/components/ProfileCard";

import MemberWorkoutSchedule from "./MemberWorkoutSchedule";

type MemberCardProps = {
  memberList: PtUserListApiResponse["data"]["content"];
  selectedMemberInformation: PtUser | null;
  onChangeSelectMemberInformation: (memberInformation: PtUser | null) => void;
};

function MemberCard({
  memberList,
  selectedMemberInformation,
  onChangeSelectMemberInformation,
}: MemberCardProps) {
  const handleClickSelectMember = (selectedMemberId: number) => {
    const selectedMember = memberList.find(({ memberId }) => memberId === selectedMemberId);
    onChangeSelectMemberInformation(selectedMember ? selectedMember : null);
  };

  return (
    <section className="relative h-full overflow-hidden">
      <div className="bg-background-primary absolute top-0 z-10 box-content flex h-7 w-full justify-between">
        <div>회원 {memberList.length}명</div>
        <div>최신 등록순</div>
      </div>
      <section className="flex h-full flex-col gap-[0.625rem] overflow-y-auto pt-[2.125rem] [&::-webkit-scrollbar]:hidden">
        {memberList.map(({ memberId, name, birthDate, phoneNumber, profilePictureUrl }) => (
          <ProfileCard
            key={`${memberId}-${name}`}
            imgUrl={profilePictureUrl}
            userBirth={new Date(birthDate)}
            userName={name}
            phoneNumber={phoneNumber}
            className={cn("w-full", {
              "border-brand-primary-500 border": selectedMemberInformation?.memberId === memberId,
            })}
            onClick={() => handleClickSelectMember(memberId)}
          >
            <MemberWorkoutSchedule memberId={memberId} />
          </ProfileCard>
        ))}
      </section>
    </section>
  );
}

export default MemberCard;
