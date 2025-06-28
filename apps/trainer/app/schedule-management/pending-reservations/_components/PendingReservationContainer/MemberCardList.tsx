/* eslint-disable no-magic-numbers */
import { useQuery } from "@tanstack/react-query";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@ui/components/Dropdown";
import Icon from "@ui/components/Icon";
import { cn } from "@ui/lib/utils";
import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";

import WorkoutScheduleFallback from "@trainer/app/schedule-management/_components/Fallback/WorkoutScheduleFallback";
import MemberProfileCard from "@trainer/app/schedule-management/_components/MemberProfileCard";
import { userManagementQueries } from "@trainer/queries/userManagement";

import {
  ReservationDetailPendingStatus,
  ReservationDetailPendingStatusApiResponse,
} from "@trainer/services/types/reservations.dto";

import { DAYS } from "@trainer/constants/Day";

import { getKoreanDate } from "@trainer/utils/date";

import { formatContinuousTimes } from "../../_utils/formatContinuousTimes";

type MemberCardListProps = {
  selectedDate?: string;
  hasOtherReservations: boolean;
  selectedMemberInformation: ReservationDetailPendingStatus | null;
  reservationPendingList: ReservationDetailPendingStatusApiResponse["data"];
  onChangeSelectMemberInformation: (
    memberInformation: ReservationDetailPendingStatus | null,
  ) => void;
};

function MemberCardList({
  hasOtherReservations,
  selectedMemberInformation,
  onChangeSelectMemberInformation,
  selectedDate,
  reservationPendingList,
}: MemberCardListProps) {
  /**
   * TODO: memberId를 통해 회원 상세 정보를 리스트로 가져와 PT 가능 시간을 프로필카드 Dropdown에 나타내기
   * TODO: reservationDate를 통해 상세 대기 목록을 모두 가져오기
   */
  const { data: userInformationDetail, isLoading } = useQuery({
    ...userManagementQueries.detail(selectedMemberInformation?.memberId as number),
    enabled: !!selectedMemberInformation?.memberId,
  });

  const formatedTime = (dates: string[]) => {
    if (!hasOtherReservations) return undefined;
    if (dates.length === 1) return undefined;

    if (selectedDate) {
      const parsedDate = parse(selectedDate, "M. d (E) HH:mm", getKoreanDate(), {
        locale: ko,
      });

      const timeOnly = format(parsedDate, "HH:mm");

      return dates
        .filter((date) => date.split("T")[1].substring(0, 5) !== timeOnly)[0]
        ?.split("T")[1]
        ?.substring(0, 5);
    }

    return undefined;
  };

  const handleClickMemberCard = (memberId: number) => () => {
    if (hasOtherReservations) return;

    const parsedMemberInformation = reservationPendingList.find(
      (memberInformation) => memberInformation.memberId === memberId,
    );

    onChangeSelectMemberInformation(parsedMemberInformation || null);
  };

  return (
    <section className="flex flex-col gap-[0.625rem] pt-[0.625rem]">
      {reservationPendingList.map((memberInfo) => {
        const { memberId, name, birthDate, profilePictureUrl, phoneNumber, reservationDates } =
          memberInfo;

        if (hasOtherReservations && reservationDates.length === 1) return;

        return (
          <MemberProfileCard
            key={`${memberId}-${name}`}
            memberId={memberId}
            imgUrl={profilePictureUrl}
            userBirth={getKoreanDate(birthDate)}
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
                {isLoading ? (
                  <WorkoutScheduleFallback />
                ) : (
                  userInformationDetail?.data?.workoutSchedules.map(
                    ({ workoutScheduleId, dayOfWeek, preferenceTimes }) => (
                      <DropdownItem key={workoutScheduleId} className="flex items-start gap-2">
                        <span>{DAYS[dayOfWeek]}</span>
                        <span className="w-full whitespace-pre-line">
                          {formatContinuousTimes(preferenceTimes)}
                        </span>
                      </DropdownItem>
                    ),
                  )
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
