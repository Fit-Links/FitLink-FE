"use client";
import { Accordion } from "@ui/components/Accordion";
import { Badge } from "@ui/components/Badge";
import { Button } from "@ui/components/Button";
import Icon from "@ui/components/Icon";
import ProfileHeader from "@ui/components/ProfileHeader";
import { ProfileItem } from "@ui/components/ProfileItem";
import PTPreference from "@ui/components/PTPreference";

function MemberProfile() {
  return (
    <section className="w-full">
      <section className="mb-5 w-full">
        <ProfileHeader>
          <ProfileHeader.Section>
            <ProfileHeader.Avatar name="최익" imageSrc="https://picsum.photos/300" />
            <ProfileHeader.Name name="최익" />
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
          <p>1998년 7월 4일</p>
        </ProfileItem>
        <ProfileItem className="w-full min-w-0" variant="phone">
          <p>010 4058 1492</p>
        </ProfileItem>
      </section>
      <section>
        <Accordion className="mt-5" type="multiple">
          <PTPreference workoutSchedule={MOCK_WORKOUT_SCHEDULE} />
        </Accordion>
      </section>
    </section>
  );
}

const MOCK_WORKOUT_SCHEDULE = [
  {
    dayOfWeek: "MON",
    preferenceTimes: ["10:00", "11:00", "12:00"],
  },
  {
    dayOfWeek: "TUE",
    preferenceTimes: ["10:00", "11:00", "12:00", "14:00", "15:00"],
  },
  {
    dayOfWeek: "WED",
    preferenceTimes: ["10:00", "11:00", "12:00"],
  },
  {
    dayOfWeek: "THU",
    preferenceTimes: ["10:00", "11:00", "12:00", "14:00", "15:00"],
  },
  {
    dayOfWeek: "FRI",
    preferenceTimes: ["10:00", "11:00", "12:00"],
  },
  {
    dayOfWeek: "SAT",
    preferenceTimes: ["10:00", "11:00", "12:00", "18:00"],
  },
  {
    dayOfWeek: "SUN",
    preferenceTimes: ["10:00", "11:00", "12:00", "18:00"],
  },
];

export default MemberProfile;
