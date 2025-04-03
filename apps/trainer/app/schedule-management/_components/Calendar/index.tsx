"use client";
import { addHours, isEqual, isSameDay, startOfDay } from "date-fns";
import { useRef, useState } from "react";
import SwiperConfig from "swiper";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { ReservationStatusApiResponse } from "@trainer/services/types/reservations.dto";

import useSyncScroll from "@trainer/hooks/useSyncScroll";

import { getOffsetDate, getWeekDates } from "@trainer/utils/CalendarUtils";

import DayColumn from "./DayColumn";
import DayOfWeek from "./DayOfWeek";
import TimeBlock from "./TimeBlock";
import TimeColumn from "./TimeColumn";
import WeekRow from "./WeekRow";

const WEEK_LENGTH = 7;
const MONTH_START_INDEX = 1;
const TOTAL_WEEKS = 52;
const currentDate = new Date();
const initialWeeks = Array.from({ length: 105 }, (_, i) =>
  getWeekDates(getOffsetDate(currentDate, (i - TOTAL_WEEKS) * WEEK_LENGTH)),
);

export default function Calendar() {
  const [currentWeek, setCurrentWeek] = useState(getWeekDates(currentDate));

  const timeColumnRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);

  const currentMonth = currentWeek[0].getMonth() + MONTH_START_INDEX;

  const handleChangeSlide = (swiperConfig: SwiperConfig) => {
    const { activeIndex } = swiperConfig;
    const newWeek = initialWeeks[activeIndex];

    setCurrentWeek(newWeek);
  };

  const mergeDateAndTime = (date: Date) => {
    return Array.from({ length: 24 }, (_, index) => addHours(startOfDay(date), index));
  };

  const parsedReservationContent = (
    reservationContents: ReservationStatusApiResponse["data"],
    date: Date,
  ) => {
    const { reservations } = reservationContents;

    return reservations.filter((content) => {
      if (content.status === "휴무일") {
        return;
      }

      return Array.isArray(content.reservationDate)
        ? isEqual(date, content.reservationDate[0])
        : isEqual(date, content.reservationDate);
    });
  };

  const isCheckDayOff = (reservationContents: ReservationStatusApiResponse["data"], date: Date) => {
    const { reservations } = reservationContents;

    return reservations.some((content) => {
      if (content.status === "휴무일") {
        return isSameDay(date, new Date(content.reservationDate as string));
      }
    });
  };

  useSyncScroll(timeColumnRef, scheduleRef);

  return (
    <section className="md:max-w-mobile relative box-content h-full w-full overflow-hidden">
      <DayOfWeek currentWeek={currentWeek} currentMonth={currentMonth} />
      <div className="flex h-full w-full pt-[4.8375rem]">
        <div
          ref={timeColumnRef}
          className="mr-2 h-full w-fit overflow-y-scroll [&::-webkit-scrollbar]:hidden"
        >
          <TimeColumn />
        </div>
        <div
          className="flex h-full w-full overflow-y-scroll [&::-webkit-scrollbar]:hidden"
          ref={scheduleRef}
        >
          <Swiper
            className="h-max w-full"
            modules={[Virtual]}
            virtual
            runCallbacksOnInit={false}
            initialSlide={52}
            onSlideChange={handleChangeSlide}
            speed={300}
          >
            {initialWeeks.map((week, index) => (
              <SwiperSlide key={`${week}-${index}`} virtualIndex={index}>
                <WeekRow key={`${week}`}>
                  {week.map((date) => (
                    <DayColumn
                      key={`${date}`}
                      isDayOff={isCheckDayOff(MOCK_RESERVATION_DATA, date)}
                    >
                      {mergeDateAndTime(date).map((mergeDate, index) => (
                        <TimeBlock
                          key={`${mergeDate}-${index}`}
                          date={mergeDate}
                          reservationContent={parsedReservationContent(
                            MOCK_RESERVATION_DATA,
                            mergeDate,
                          )}
                        />
                      ))}
                    </DayColumn>
                  ))}
                </WeekRow>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

const MOCK_RESERVATION_DATA: ReservationStatusApiResponse["data"] = {
  reservations: [
    {
      reservationId: 1,
      sessionInfoId: 6,
      isDayOff: false,
      dayOfWeek: "WEDNESDAY",
      reservationDate: "2025-04-30T18:00",
      status: "예약 확정",
      memberInfo: {
        memberId: 5,
        name: "홍길동",
      },
    },
    {
      reservationId: 2,
      sessionInfoId: 11,
      isDayOff: false,
      dayOfWeek: "TUESDAY",
      reservationDate: "2025-04-01T11:00",
      status: "수업 완료",
      memberInfo: {
        memberId: 12,
        name: "김철수",
      },
    },
    {
      reservationId: 5,
      sessionInfoId: 3,
      isDayOff: false,
      dayOfWeek: "MONDAY",
      reservationDate: "2025-04-28T15:00",
      status: "예약 대기",
      memberInfo: {
        memberId: 13,
        name: "김진수",
      },
    },
    {
      reservationId: 6,
      sessionInfoId: 4,
      isDayOff: false,
      dayOfWeek: "MONDAY",
      reservationDate: "2025-04-28T15:00",
      status: "예약 대기",
      memberInfo: {
        memberId: 14,
        name: "이한동",
      },
    },
    {
      reservationId: 7,
      sessionInfoId: 5,
      isDayOff: false,
      dayOfWeek: "MONDAY",
      reservationDate: "2025-04-28T15:00",
      status: "예약 대기",
      memberInfo: {
        memberId: 15,
        name: "하재홍",
      },
    },
    {
      reservationId: 11,
      sessionInfoId: null,
      isDayOff: true,
      dayOfWeek: "THURSDAY",
      reservationDate: "2025-04-03",
      status: "휴무일",
      memberInfo: {
        memberId: null,
        name: null,
      },
    },
    {
      reservationId: 11,
      sessionInfoId: null,
      isDayOff: true,
      dayOfWeek: "FRIDAY",
      reservationDate: "2025-04-04",
      status: "휴무일",
      memberInfo: {
        memberId: null,
        name: null,
      },
    },
    {
      reservationId: 20,
      sessionInfoId: null,
      isDayOff: false,
      dayOfWeek: "WEDNESDAY",
      reservationDate: ["2025-04-02T11:00"],
      status: "예약 불가",
      memberInfo: {
        memberId: null,
        name: null,
      },
    },
  ],
};
