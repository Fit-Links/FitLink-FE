const SUNDAY_INDEX = 0;
const SATURDAY_INDEX = 6;
const MONTH_OFFSET = 1;
const PAD_LENGTH = 2;

export const currentYearWithMonth = (month: Date) => {
  const currentMonth = month.getMonth() + MONTH_OFFSET;

  const paddedMonth = String(currentMonth).padStart(PAD_LENGTH, "0");

  return `${month.getFullYear()}. ${paddedMonth}`;
};

export const isWeekend = (date: Date) => {
  const day = date.getDay();

  return day === SUNDAY_INDEX || day === SATURDAY_INDEX;
};
