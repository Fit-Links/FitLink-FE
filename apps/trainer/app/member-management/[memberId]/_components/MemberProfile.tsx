"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Accordion } from "@ui/components/Accordion";
import { Badge } from "@ui/components/Badge";
import { Button } from "@ui/components/Button";
import Icon from "@ui/components/Icon";
import ProfileHeader from "@ui/components/ProfileHeader";
import { ProfileItem } from "@ui/components/ProfileItem";
import PTPreference from "@ui/components/PTPreference";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";

import { userManagementQueries } from "@trainer/queries/userManagement";

import RouteInstance from "@trainer/constants/route";

type MemberProfileProps = {
  memberId: number;
};

function MemberProfile({ memberId }: MemberProfileProps) {
  const router = useRouter();

  const { data: userInformationDetail } = useSuspenseQuery(userManagementQueries.detail(memberId));

  const {
    name,
    birthDate,
    phoneNumber,
    profilePictureUrl,
    fixedReservations,
    workoutSchedules,
    sessionInfo,
  } = userInformationDetail.data;

  const handleClickRouteFixReservationEditPage = () => {
    router.push(
      RouteInstance["select-pt-times"]("", {
        memberId: memberId.toString(),
        name: name,
        edit: "true",
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
            <Badge className="text-body-1">{`${sessionInfo.remainingCount} / ${sessionInfo.totalCount}`}</Badge>
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
          <PTPreference workoutSchedule={workoutSchedules} />
        </Accordion>
        <Accordion className="mt-5" type="multiple">
          <PTPreference
            triggerText="PT 고정 예약"
            fixedReservations={fixedReservations}
            hasEllipsis
            onEllipsisClick={handleClickRouteFixReservationEditPage}
          />
        </Accordion>
      </section>
    </section>
  );
}

export default MemberProfile;
