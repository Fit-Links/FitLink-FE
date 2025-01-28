"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import useSyncScroll from "@trainer/hooks/useSyncScroll";

import { getWeekDates } from "@trainer/utils/CalendarUtils";

import DayOfWeek from "./DayOfWeek";
import TimeColumn from "./TimeColumn";
import WeekSchedule from "./WeekSchedule";

const WEEK_LENGTH = 7;
const MONTH_START_INDEX = 1;

export default function Calendar() {
  const currentDate = new Date();
  const [currentWeek, setCurrentWeek] = useState(getWeekDates(currentDate));
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + MONTH_START_INDEX);
  const [dummy] = useState(["0", "1", "2"]); // TODO: 해당 부분 주간 예약 정보 API를 받아와서 교체

  const timeColumnRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);

  const handleSlideNext = () => {
    const nextWeek = new Date(currentWeek[0]);
    nextWeek.setDate(currentWeek[0].getDate() + WEEK_LENGTH);

    const nextWeekDates = getWeekDates(nextWeek);
    setCurrentWeek(nextWeekDates);
    setCurrentMonth(nextWeekDates[0].getMonth() + MONTH_START_INDEX);
  };

  const handleSlidePrev = () => {
    const prevWeek = new Date(currentWeek[0]);
    prevWeek.setDate(currentWeek[0].getDate() - WEEK_LENGTH);

    const prevWeekDates = getWeekDates(prevWeek);
    setCurrentWeek(prevWeekDates);
    setCurrentMonth(prevWeekDates[0].getMonth() + MONTH_START_INDEX);
  };

  useSyncScroll(timeColumnRef, scheduleRef);

  return (
    <section className="h-fit w-fit">
      <DayOfWeek currentWeek={currentWeek} currentMonth={currentMonth} />
      <div className="flex h-[35.9375rem] w-[356px]">
        <div
          ref={timeColumnRef}
          className="h-full w-fit overflow-auto [&::-webkit-scrollbar]:hidden"
        >
          <TimeColumn />
        </div>
        <div
          className="flex w-[306px] overflow-auto [&::-webkit-scrollbar]:hidden"
          ref={scheduleRef}
        >
          <Swiper
            className="h-max w-full"
            loop
            onSlideNextTransitionStart={handleSlideNext}
            onSlidePrevTransitionStart={handleSlidePrev}
          >
            {dummy.map((e) => (
              <SwiperSlide key={e}>
                <WeekSchedule dayOfWeek={currentWeek} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
