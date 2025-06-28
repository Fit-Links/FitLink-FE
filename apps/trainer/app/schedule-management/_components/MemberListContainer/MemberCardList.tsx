import { cn } from "@ui/lib/utils";
import React, { forwardRef } from "react";

import { PtUser, PtUserListApiResponse } from "@trainer/services/types/userManagement.dto";

import { getKoreanDate } from "@trainer/utils/date";

import MemberProfileCard from "../MemberProfileCard";
import WorkoutSchedule from "../MemberProfileCard/WorkoutSchedule";

type MemberCardListProps = {
  memberList: PtUserListApiResponse["data"]["content"];
  selectedMemberInformation: PtUser | null;
  onChangeSelectMemberInformation: (memberInformation: PtUser | null) => void;
};

const MemberCardList = forwardRef<HTMLDivElement, MemberCardListProps>(
  ({ memberList, selectedMemberInformation, onChangeSelectMemberInformation }, ref) => {
    const handleClickSelectMember = (selectedMemberId: number) => () => {
      const selectedMember = memberList.find(({ memberId }) => memberId === selectedMemberId);
      onChangeSelectMemberInformation(selectedMember ? selectedMember : null);
    };

    return (
      <section className="flex h-full flex-col gap-[0.625rem] overflow-y-auto pt-[2.125rem] [&::-webkit-scrollbar]:hidden">
        {memberList.map(({ memberId, name, birthDate, phoneNumber, profilePictureUrl }) => (
          <MemberProfileCard
            key={`${memberId}-${name}`}
            memberId={memberId}
            imgUrl={profilePictureUrl}
            userBirth={getKoreanDate(birthDate)}
            userName={name}
            phoneNumber={phoneNumber}
            className={cn(
              selectedMemberInformation?.memberId === memberId && "border-brand-primary-500 border",
            )}
            onClick={handleClickSelectMember(memberId)}
          >
            <WorkoutSchedule memberId={memberId} />
          </MemberProfileCard>
        ))}
        <div ref={ref} />
      </section>
    );
  },
);

export default MemberCardList;
