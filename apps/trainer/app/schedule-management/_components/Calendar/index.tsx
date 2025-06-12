"use client";
import { useSuspenseQueries } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import { cn } from "@ui/lib/utils";
import { format, startOfWeek } from "date-fns";
import { ko } from "date-fns/locale";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SwiperConfig from "swiper";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { myInformationQueries } from "@trainer/queries/myInformation";

import CalendarHintGroup from "@trainer/components/CalendarHintGroup";

import useSyncScroll from "@trainer/hooks/useSyncScroll";

import { getOffsetDate, getWeekDates } from "@trainer/utils/CalendarUtils";

import DayOfWeek from "./DayOfWeek";
import TimeColumn from "./TimeColumn";
import WeekRow from "./WeekRow";

const WEEK_LENGTH = 7;
const MONTH_START_INDEX = 1;
const TOTAL_WEEKS = 52;
const currentDate = new Date();
const initialWeeks = Array.from({ length: 105 }, (_, i) =>
  getWeekDates(getOffsetDate(currentDate, (i - TOTAL_WEEKS) * WEEK_LENGTH)),
);

function Calendar() {
  const searchParams = useSearchParams();
  const isFixedReservationChangeMode = searchParams.get("fixReservationChangeMode");

  const koreanSunday = startOfWeek(new Date(), { weekStartsOn: 0, locale: ko });
  const simpleDate = format(koreanSunday, "yyyy-MM-dd");

  const [reservationQueryDate, setReservationQueryDate] = useState(simpleDate);
  const [currentWeek, setCurrentWeek] = useState(getWeekDates(currentDate));

  const timeColumnRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);

  const currentMonth = currentWeek[0].getMonth() + MONTH_START_INDEX;

  const [{ data: dayoff }, { data: ptAvailableTime }] = useSuspenseQueries({
    queries: [myInformationQueries.dayOff(), myInformationQueries.ptAvailableTime()],
  });

  const handleChangeSlide = (swiperConfig: SwiperConfig) => {
    const { activeIndex } = swiperConfig;
    const newWeek = initialWeeks[activeIndex];

    setCurrentWeek(newWeek);

    const newStartDate = format(newWeek[0], "yyyy-MM-dd");
    setReservationQueryDate(newStartDate);
  };

  const handleClickDisableFixedReservation = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("fixReservationChangeMode");
    window.history.pushState({}, "", url);
  };

  useSyncScroll(timeColumnRef, scheduleRef);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const url = new URL(window.location.href);
        url.searchParams.delete("fixReservationChangeMode");
        window.history.pushState({}, "", url);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {isFixedReservationChangeMode ? (
        <div className="py-[0.875rem]">
          <Button onClick={handleClickDisableFixedReservation}>고정 예약 변경 비활성화</Button>
        </div>
      ) : (
        <div className="py-[0.875rem]">
          <CalendarHintGroup />
        </div>
      )}
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
            className={cn(
              "h-full w-full overflow-y-scroll [&::-webkit-scrollbar]:hidden",
              isFixedReservationChangeMode && "border-brand-primary-300 border-2",
            )}
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
                  <WeekRow
                    key={`${week}`}
                    week={week}
                    ptAvailableTime={ptAvailableTime}
                    dayoff={dayoff}
                    reservationQueryDate={reservationQueryDate}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}

export default Calendar;
