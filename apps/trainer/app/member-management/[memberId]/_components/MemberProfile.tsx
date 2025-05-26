"use client";
import { Accordion } from "@ui/components/Accordion";
import { Badge } from "@ui/components/Badge";
import { Button } from "@ui/components/Button";
import Icon from "@ui/components/Icon";
import ProfileHeader from "@ui/components/ProfileHeader";
import { ProfileItem } from "@ui/components/ProfileItem";
import PTPreference from "@ui/components/PTPreference";
import { DaysOfWeek } from "@ui/utils/makeWeekSchedule";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";

import { PtUser } from "@trainer/services/types/userManagement.dto";

import RouteInstance from "@trainer/constants/route";

function MemberProfile() {
  const router = useRouter();

  const { memberId, name, birthDate, phoneNumber, profilePictureUrl, sessionInfo }: PtUser =
    MOCK_MEMBER_DETAIL_INFORMATION;

  const handleClickRouteFixReservationEditPage = () => {
    router.push(
      RouteInstance["select-pt-times"]("", {
        memberInformation: encodeURIComponent(
          JSON.stringify({
            memberId,
            name,
            birthDate,
            phoneNumber,
            profilePictureUrl,
            sessionInfo,
          }),
        ),
      }),
    );
  };

  /** TODO: 회원 상세정보 API에서 고정 예약 데이터 받아와 드랍다운으로 나타내기 */
  return (
    <section className="w-full">
      <section className="mb-5 w-full">
        <ProfileHeader>
          <ProfileHeader.Section>
            <ProfileHeader.Avatar name={name} imageSrc={profilePictureUrl} />
            <ProfileHeader.Name name={name} />
          </ProfileHeader.Section>
          <ProfileHeader.Section>
            <Badge className="text-body-1">01/20</Badge>
            <Button className="bg-background-sub5 text-text-sub5 h-[1.875rem] w-[1.875rem] rounded-full">
              <Icon name="Ellipsis" size="lg" />
            </Button>
          </ProfileHeader.Section>
        </ProfileHeader>
      </section>
      <section className="w-full">
        <ProfileItem className="w-full min-w-0" variant="birthday">
          <p>{format(birthDate, "yyyy년 M월 d일", { locale: ko })}</p>
        </ProfileItem>
        <ProfileItem className="w-full min-w-0" variant="phone">
          <p>{phoneNumber}</p>
        </ProfileItem>
      </section>
      <section>
        <Accordion className="mt-5" type="multiple">
          <PTPreference workoutSchedule={MOCK_WORKOUT_SCHEDULE} />
        </Accordion>
        <Accordion className="mt-5" type="multiple">
          <PTPreference
            triggerText="PT 고정 예약"
            workoutSchedule={MOCK_WORKOUT_SCHEDULE}
            hasEllipsis
            onEllipsisClick={handleClickRouteFixReservationEditPage}
          />
        </Accordion>
      </section>
    </section>
  );
}

/** TODO: 회원 상세 정보 API 붙이면 목데이터 제거 */
const MOCK_MEMBER_DETAIL_INFORMATION = {
  memberId: 1,
  name: "홍길동",
  birthDate: "2002-01-12",
  phoneNumber: "010 2832 1232",
  connectingStatus: "CONNECTED", // CONNECTED(연동 완료) -> 무조건 CONNECTED 상태만 조회
  profilePictureUrl: "https://picsum.photos/300",
  sessionInfo: {
    sessionInfoId: 1,
    totalCount: 1,
    remainingCount: 2,
  },
  workoutSchedules: [
    {
      dayOfWeek: "MONDAY",
      preferenceTimes: ["10:00", "11:00", "12:00"],
    },
    {
      dayOfWeek: "TUESDAY",
      preferenceTimes: ["10:00", "11:00", "12:00", "14:00", "15:00"],
    },
    {
      dayOfWeek: "WEDNESDAY",
      preferenceTimes: ["10:00", "11:00", "12:00"],
    },
    {
      dayOfWeek: "THURSDAY",
      preferenceTimes: ["10:00", "11:00", "12:00", "14:00", "15:00"],
    },
    {
      dayOfWeek: "FRIDAY",
      preferenceTimes: ["10:00", "11:00", "12:00"],
    },
    {
      dayOfWeek: "SATURDAY",
      preferenceTimes: ["10:00", "11:00", "12:00", "18:00"],
    },
    {
      dayOfWeek: "SUNDAY",
      preferenceTimes: ["10:00", "11:00", "12:00", "18:00"],
    },
  ],
};

const MOCK_WORKOUT_SCHEDULE: { dayOfWeek: DaysOfWeek; preferenceTimes: string[] }[] = [
  {
    dayOfWeek: "MONDAY",
    preferenceTimes: ["10:00", "11:00", "12:00"],
  },
  {
    dayOfWeek: "TUESDAY",
    preferenceTimes: ["10:00", "11:00", "12:00", "14:00", "15:00"],
  },
  {
    dayOfWeek: "WEDNESDAY",
    preferenceTimes: ["10:00", "11:00", "12:00"],
  },
  {
    dayOfWeek: "THURSDAY",
    preferenceTimes: ["10:00", "11:00", "12:00", "14:00", "15:00"],
  },
  {
    dayOfWeek: "FRIDAY",
    preferenceTimes: ["10:00", "11:00", "12:00"],
  },
  {
    dayOfWeek: "SATURDAY",
    preferenceTimes: ["10:00", "11:00", "12:00", "18:00"],
  },
  {
    dayOfWeek: "SUNDAY",
    preferenceTimes: ["10:00", "11:00", "12:00", "18:00"],
  },
];

export default MemberProfile;
