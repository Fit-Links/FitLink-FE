/* eslint-disable no-magic-numbers */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { myInformationQueries } from "@trainer/queries/myInformation";

import { addTimeOff } from "@trainer/services/myInformation";
import { AddTimeOffRequestBody } from "@trainer/services/types/myInformation.dto";

export const useDayoffAddMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (days: AddTimeOffRequestBody) => addTimeOff(days),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myInformationQueries.dayOff().queryKey });
    },
  });

  return { addDayoff: mutate, ...rest };
};
