"use client";

import { PtInfo } from "@5unwan/core/api/types/common";
import { Badge } from "@ui/components/Badge";
import { Button } from "@ui/components/Button";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@ui/components/Dropdown";
import { Popup, PopupTrigger } from "@ui/components/Popup";
import ProfileHeader from "@ui/components/ProfileHeader";
import { ProfileItem, ProfileItemContent } from "@ui/components/ProfileItem";
import PTHistoryItem from "@ui/components/PTHistoryItem";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  MyInformationApiResponse,
  MyPtHistoryApiResponse,
} from "@user/services/types/myInformation.dto";

import { getFormattedPTCount } from "@user/utils/count";

type PTHistoryFilterTypes = "ALL" | "COMPLETED" | "NO_SHOW" | "NONE";

export default function Home() {
  const router = useRouter();

  const FILTER_OPTIONS: Record<PTHistoryFilterTypes, string> = {
    ALL: "전체",
    COMPLETED: "PT 완료",
    NO_SHOW: "불참석",
    NONE: "미처리",
  };

  const [ptHistoryFilter, setPtHistoryFilter] = useState<PTHistoryFilterTypes>("ALL");

  const [mockData] = useState<MyInformationApiResponse["data"]>({
    memberId: 1,
    name: "홍길동",
    trainerId: 1,
    trainerName: "",
    profilePictureUrl:
      "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/cnoC/image/L5UV5eFyTS1Ar4MTDDOd_Ynrzt4",
    sessionInfo: {
      sessionInfoId: 1,
      totalCount: 20,
      remainingCount: 2,
    },
    workoutSchedules: [
      {
        workoutScheduleId: "1",
        dayOfWeek: "MONDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: "2",
        dayOfWeek: "TUESDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: "3",
        dayOfWeek: "WEDNESDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: "4",
        dayOfWeek: "THURSDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: "5",
        dayOfWeek: "FRIDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: "6",
        dayOfWeek: "SATURDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
      {
        workoutScheduleId: "7",
        dayOfWeek: "SUNDAY",
        preferenceTimes: ["10:00", "12:00"],
      },
    ],
  });

  const [mock_pt_history] = useState<MyPtHistoryApiResponse["data"]>({
    content: [
      {
        sessionId: 1,
        reservationDate: "2021-08-01T12:00:00",
        status: "COMPLETED",
      },
      {
        sessionId: 2,
        reservationDate: "2021-08-01T12:00:00",
        status: "NO_SHOW",
      },
      {
        sessionId: 3,
        reservationDate: "2021-08-01T12:00:00",
        status: "NONE",
      },
    ],
    totalPages: "1",
    totalElements: "1",
  });

  const handleClickChangeHistoryFilter = (filter: PTHistoryFilterTypes) => {
    setPtHistoryFilter(filter);
  };

  const handleClickRouting = (path: string) => {
    const currentPath = window.location.pathname;

    if (currentPath === path) return;
    router.push(`${currentPath}/${path}`);
  };

  const negative = {
    label: "취소",
    callback: () => {},
  };

  const positive = {
    label: "로그아웃",
    callback: () => {
      router.push("/");
    },
  };

  return (
    <main className="flex h-screen w-full flex-col overflow-hidden pb-[5.063rem]">
      <section className="flex items-center justify-between">
        <ProfileHeader>
          <ProfileHeader.Section
            onClick={() => {
              handleClickRouting("/my-infomation");
            }}
          >
            <ProfileHeader.Avatar name="홍길동" imageSrc={mockData.profilePictureUrl} />
            <ProfileHeader.Name name="홍길동" />
          </ProfileHeader.Section>
        </ProfileHeader>
        <Popup title="로그아웃을 하시겠습니까?" negative={negative} positive={positive}>
          <PopupTrigger className="w-fit">
            <Badge variant="sub2" className="px-4">
              로그아웃
            </Badge>
          </PopupTrigger>
        </Popup>
      </section>

      <section className="mt-[1.563rem] flex h-auto flex-col">
        <ProfileItem variant="dumbbell">
          <ProfileItemContent>
            <Badge>
              {getFormattedPTCount(
                mockData.sessionInfo.remainingCount,
                mockData.sessionInfo.totalCount,
              )}
            </Badge>
          </ProfileItemContent>
        </ProfileItem>
        <ProfileItem variant="trainer">
          <ProfileItemContent
            className="cursor-pointer"
            onClick={() => {
              if (mockData.trainerName !== "") {
                handleClickRouting("/my-trainer-infomation");
              } else {
                handleClickRouting("/connect-trainer");
              }
            }}
          >
            <div
              className={`flex items-center gap-0 ${mockData.trainerName ? "" : "text-text-primary"}`}
            >
              {mockData.trainerName ? mockData.trainerName : "연동하기"}
              <ChevronRight />
            </div>
          </ProfileItemContent>
        </ProfileItem>
      </section>

      <section className="mt-[0.625rem] flex h-auto flex-col">
        <Dropdown className="w-full">
          <DropdownTrigger>
            <div className="text-headline">PT희망 시간</div>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem>
              <div className="">희망시간</div>
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </section>

      <section className="flex h-auto flex-col">
        <Dropdown className="w-full">
          <DropdownTrigger>
            <div className="text-headline">PT고정 시간</div>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem>
              <div className="">고정시간</div>
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </section>

      <section>
        <p className="text-headline mt-[1.625rem]">PT 내역</p>

        <div className="mt-[0.625rem] flex items-center gap-2">
          {Object.entries(FILTER_OPTIONS).map(([key, value]) => (
            <Button
              key={`PT-history-filter-${key}`}
              size="sm"
              variant={ptHistoryFilter === key ? "negative" : "secondary"}
              onClick={() => handleClickChangeHistoryFilter(key as PTHistoryFilterTypes)}
            >
              {value}
            </Button>
          ))}
        </div>
      </section>

      <section className="mt-[1.25rem] flex flex-col gap-[0.625rem] overflow-y-auto pb-2">
        {mock_pt_history.content.map((item: PtInfo) => {
          if (item.status !== ptHistoryFilter && ptHistoryFilter !== "ALL") return;

          return (
            <PTHistoryItem
              key={`PT-history-item-${item.sessionId}`}
              reservationDate={item.reservationDate}
              status={item.status as "COMPLETED" | "NO_SHOW" | "NONE"}
            />
          );
        })}
      </section>
    </main>
  );
}
