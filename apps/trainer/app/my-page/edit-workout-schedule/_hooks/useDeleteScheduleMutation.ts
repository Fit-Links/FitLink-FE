import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { myInformationQueries } from "@trainer/queries/myInformation";

import { deleteAvailablePtTime } from "@trainer/services/myInformation";

export default function useDeleteScheduleMutation() {
  const queryClient = useQueryClient();

  const { data: currentData } = useQuery(myInformationQueries.ptAvailableTime());

  const previousChangeApplyAt = currentData?.data.scheduledChanges?.applyAt;

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: () => deleteAvailablePtTime({ applyAt: previousChangeApplyAt as string }),
    onSuccess: () => {
      queryClient.invalidateQueries(myInformationQueries.ptAvailableTime());
    },
  });

  return { deleteSchedule: mutateAsync, ...rest };
}
