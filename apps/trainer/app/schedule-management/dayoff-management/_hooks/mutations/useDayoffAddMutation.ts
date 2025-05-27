import { useMutation } from "@tanstack/react-query";

import { addTimeOff } from "@trainer/services/myInformation";
import { AddTimeOffRequestBody } from "@trainer/services/types/myInformation.dto";

export const useDayoffAddMutation = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: (days: AddTimeOffRequestBody) => addTimeOff(days),
  });

  return { addDayoff: mutate, ...rest };
};
