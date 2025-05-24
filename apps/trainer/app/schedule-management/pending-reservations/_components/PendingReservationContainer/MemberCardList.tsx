/* eslint-disable no-magic-numbers */
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@ui/components/Dropdown";
import Icon from "@ui/components/Icon";
import { cn } from "@ui/lib/utils";
import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";

import MemberProfileCard from "@trainer/app/schedule-management/_components/MemberProfileCard";

import {
  ReservationWaitingMember,
  GetReservationWaitingMembersApiResponse,
} from "@trainer/services/types/reservations.dto";
import { PtUserDetailApiResponse } from "@trainer/services/types/userManagement.dto";

import { DAYS } from "@trainer/constants/Day";

import { formatContinuousTimes } from "../../_utils/formatContinuousTimes";

type MemberCardListProps = {
  selectedDate?: string;
  hasOtherReservations: boolean;
  selectedMemberInformation: ReservationWaitingMember | null;
  onChangeSelectMemberInformation: (memberInformation: ReservationWaitingMember | null) => void;
};

function MemberCardList({
  hasOtherReservations,
  selectedMemberInformation,
  onChangeSelectMemberInformation,
  selectedDate,
}: MemberCardListProps) {
  /**
   * TODO: memberId를 통해 회원 상세 정보를 리스트로 가져와 PT 가능 시간을 프로필카드 Dropdown에 나타내기
   * TODO: reservationDate를 통해 상세 대기 목록을 모두 가져오기
   */

  const formatedTime = (dates: string[]) => {
    if (!hasOtherReservations) return undefined;
    if (dates.length === 1) return undefined;

    if (selectedDate) {
      const parsedDate = parse(selectedDate, "M. d (E) HH:mm", new Date(), {
        locale: ko,
      });

      const timeOnly = format(parsedDate, "HH:mm");

      return dates.filter((date) => date.split("T")[1] !== timeOnly)[0].split("T")[1];
    }

    return undefined;
  };

  const handleClickMemberCard = (memberId: number) => () => {
    if (hasOtherReservations) return;

    const parsedMemberInformation = MOCK_PENDING_MEMBERS.waitingMembers.find(
      (memberInformation) => memberInformation.memberId === memberId,
    );

    onChangeSelectMemberInformation(parsedMemberInformation || null);
  };

  return (
    <section className="flex flex-col gap-[0.625rem] pt-[0.625rem]">
      {MOCK_PENDING_MEMBERS.waitingMembers.map((memberInfo) => {
        const { memberId, name, birthDate, profilePictureUrl, phoneNumber, reservationDates } =
          memberInfo;
        const userInformation = MOCK_MEMBER_DETAIL_INFORMATIONS.find(
          (memberInformation) => memberInformation.memberId === memberId,
        );

        if (hasOtherReservations && reservationDates.length === 1) return;

        return (
          <MemberProfileCard
            key={`${memberId}-${name}`}
            memberId={memberId}
            imgUrl={profilePictureUrl}
            userBirth={new Date(birthDate)}
            userName={name}
            phoneNumber={phoneNumber}
            PTReservationOtherTime={formatedTime(reservationDates)}
            className={cn(
              !hasOtherReservations &&
                selectedMemberInformation?.memberId === memberId &&
                "border-brand-primary-500 border",
            )}
            onClick={handleClickMemberCard(memberId)}
          >
            <Dropdown>
              <DropdownTrigger asChild>
                <div className="flex cursor-pointer items-center gap-2">
                  <p>PT 희망 시간</p>
                  <Icon name="ChevronDown" size="md" />
                </div>
              </DropdownTrigger>
              <DropdownContent>
                {userInformation?.workoutSchedules.map(
                  ({ workoutScheduleId, dayOfWeek, preferenceTimes }) => (
                    <DropdownItem key={workoutScheduleId} className="flex items-start gap-2">
                      <span>{DAYS[dayOfWeek]}</span>
                      <span className="w-full whitespace-pre-line">
                        {formatContinuousTimes(preferenceTimes)}
                      </span>
                    </DropdownItem>
                  ),
                )}
              </DropdownContent>
            </Dropdown>
          </MemberProfileCard>
        );
      })}
    </section>
  );
}

export default MemberCardList;

const MOCK_PENDING_MEMBERS: GetReservationWaitingMembersApiResponse["data"] = {
  waitingMembers: [
    {
      memberId: 5,
      name: "홍길동",
      birthDate: "1996-07-13",
      phoneNumber: "01057145507",
      profilePictureUrl: "https://",
      reservationId: 11,
      reservationDates: ["2025-02-12T18:00"],
      dayOfWeek: "MONDAY",
    },
    {
      memberId: 7,
      name: "김민수",
      birthDate: "1998-10-13",
      phoneNumber: "01057645507",
      profilePictureUrl: "https://",
      reservationId: 11,
      reservationDates: ["2025-04-28T15:00", "2025-04-28T20:00"],
      dayOfWeek: "MONDAY",
    },
    {
      memberId: 15,
      name: "하제홍",
      birthDate: "1998-10-13",
      phoneNumber: "01057645507",
      profilePictureUrl: "https://",
      reservationId: 11,
      reservationDates: ["2025-04-28T15:00", "2025-04-28T19:00"],
      dayOfWeek: "MONDAY",
    },
  ],
};

const MOCK_MEMBER_DETAIL_INFORMATIONS: PtUserDetailApiResponse["data"][] = [
  {
    memberId: 5,
    name: "홍길동",
    birthDate: "2002-01-12",
    phoneNumber: "01028321232",
    connectingStatus: "CONNECTED", // CONNECTED(연동 완료) -> 무조건 CONNECTED 상태만 조회
    profilePictureUrl: "asdasd@asdasd.com",
    sessionInfo: {
      sessionInfoId: 1,
      totalCount: 1,
      remainingCount: 2,
    },
    workoutSchedules: [
      {
        workoutScheduleId: 1,
        dayOfWeek: "MONDAY",
        preferenceTimes: ["10:00", "11:00", "12:00", "14:00", "15:00", "20:00", "21:00", "24:00"],
      },
      {
        workoutScheduleId: 2,
        dayOfWeek: "TUESDAY",
        preferenceTimes: ["10:00", "11:00", "12:00", "14:00", "15:00", "20:00", "21:00", "24:00"],
      },
      {
        workoutScheduleId: 3,
        dayOfWeek: "WEDNESDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 4,
        dayOfWeek: "THURSDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 5,
        dayOfWeek: "FRIDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 6,
        dayOfWeek: "SATURDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 7,
        dayOfWeek: "SUNDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
    ],
  },
  {
    memberId: 7,
    name: "김민수",
    birthDate: "2002-01-12",
    phoneNumber: "01028321232",
    connectingStatus: "CONNECTED", // CONNECTED(연동 완료) -> 무조건 CONNECTED 상태만 조회
    profilePictureUrl: "asdasd@asdasd.com",
    sessionInfo: {
      sessionInfoId: 1,
      totalCount: 1,
      remainingCount: 2,
    },
    workoutSchedules: [
      {
        workoutScheduleId: 1,
        dayOfWeek: "MONDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 2,
        dayOfWeek: "TUESDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 3,
        dayOfWeek: "WEDNESDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 4,
        dayOfWeek: "THURSDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 5,
        dayOfWeek: "FRIDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 6,
        dayOfWeek: "SATURDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 7,
        dayOfWeek: "SUNDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
    ],
  },
  {
    memberId: 15,
    name: "하제홍",
    birthDate: "2002-01-12",
    phoneNumber: "01028321232",
    connectingStatus: "CONNECTED", // CONNECTED(연동 완료) -> 무조건 CONNECTED 상태만 조회
    profilePictureUrl: "asdasd@asdasd.com",
    sessionInfo: {
      sessionInfoId: 1,
      totalCount: 1,
      remainingCount: 2,
    },
    workoutSchedules: [
      {
        workoutScheduleId: 1,
        dayOfWeek: "MONDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 2,
        dayOfWeek: "TUESDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 3,
        dayOfWeek: "WEDNESDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 4,
        dayOfWeek: "THURSDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 5,
        dayOfWeek: "FRIDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 6,
        dayOfWeek: "SATURDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: 7,
        dayOfWeek: "SUNDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
    ],
  },
];
