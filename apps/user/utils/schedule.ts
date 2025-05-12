import { PreferredWorkout } from "@5unwan/core/api/types/common";

import { DAYS } from "@user/constants/Day";

export const getPreferredSchedule = (schedules: PreferredWorkout) => {
  return `${DAYS[schedules.dayOfWeek as keyof typeof DAYS]} ${schedules.preferenceTimes.join(" - ")}`;
};
