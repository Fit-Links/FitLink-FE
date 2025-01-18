const SUNDAY_INDEX = 0;
const SATURDAY_INDEX = 6;
const MONTH_OFFSET = 1;
const SINGLE_DIGIT_MONTH_THRESHOLD = 10;

export const currentYearWithMonth = (month: Date) => {
  const currentMonth = month.getMonth() + MONTH_OFFSET;

  const paddedMonth =
    currentMonth < SINGLE_DIGIT_MONTH_THRESHOLD ? `0${currentMonth}` : currentMonth;

  return `${month.getFullYear()}. ${paddedMonth}`;
};

export const isWeekend = (date: Date) => {
  const day = date.getDay();

  return day === SUNDAY_INDEX || day === SATURDAY_INDEX;
};
