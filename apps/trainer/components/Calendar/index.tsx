"use client";
import { useRef, useState } from "react";
import SwiperConfig from "swiper";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import useSyncScroll from "@trainer/hooks/useSyncScroll";

import { getOffsetDate, getWeekDates } from "@trainer/utils/CalendarUtils";

import DayOfWeek from "./DayOfWeek";
import TimeColumn from "./TimeColumn";
import WeekSchedule from "./WeekSchedule";

const WEEK_LENGTH = 7;
const MONTH_START_INDEX = 1;
const TOTAL_WEEKS = 52;
const currentDate = new Date();
const initialWeeks = Array.from({ length: 105 }, (_, i) =>
  getWeekDates(getOffsetDate(currentDate, (i - TOTAL_WEEKS) * WEEK_LENGTH)),
);

export default function Calendar() {
  const [currentWeek, setCurrentWeek] = useState(getWeekDates(currentDate));
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + MONTH_START_INDEX);
  const timeColumnRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);

  const handleChangeSlide = (swiperConfig: SwiperConfig) => {
    const { activeIndex } = swiperConfig;
    const newWeek = initialWeeks[activeIndex];

    setCurrentMonth(newWeek[0].getMonth() + MONTH_START_INDEX);
    setCurrentWeek(newWeek);
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
            modules={[Virtual]}
            virtual
            runCallbacksOnInit={false}
            initialSlide={52}
            onSlideChange={handleChangeSlide}
            speed={300}
          >
            {initialWeeks.map((week, index) => (
              <SwiperSlide key={`${week}-${index}`} virtualIndex={index}>
                <WeekSchedule dayOfWeek={week} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
