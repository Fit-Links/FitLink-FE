import { useMutation, useQueryClient } from "@tanstack/react-query";

import { myInformationQueries } from "@trainer/queries/myInformation";

import { addAvailablePtTime } from "@trainer/services/myInformation";

export default function useAddScheduleMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: addAvailablePtTime,
    onSuccess: () => {
      queryClient.invalidateQueries(myInformationQueries.ptAvailableTime());
    },
  });

  return { addSchedule: mutateAsync, ...rest };
}
