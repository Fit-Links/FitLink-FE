import { Days } from "@trainer/types/Day";

const MONTH_START_INDEX = 1;

export const formatDateTimeWithDay = (date: Date) => {
  const month = date.getMonth();
  const day = date.getDate();
  const dayOfTheweek = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${month + MONTH_START_INDEX}. ${day} (${getKoreanDayOfWeek(dayOfTheweek)}) ${hour}:${minute}`;
};

export const getKoreanDayOfWeek = (day: number) => {
  const { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday } = Days;
  switch (day) {
    case Sunday: {
      return "일";
    }
    case Monday: {
      return "월";
    }
    case Tuesday: {
      return "화";
    }
    case Wednesday: {
      return "수";
    }
    case Thursday: {
      return "목";
    }
    case Friday: {
      return "금";
    }
    case Saturday: {
      return "토";
    }
  }
};
