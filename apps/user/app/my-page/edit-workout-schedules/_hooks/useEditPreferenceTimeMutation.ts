import { useMutation, useQueryClient } from "@tanstack/react-query";

import { myInformationQueries } from "@user/queries/myInformation";

import { editPreferredTime } from "@user/services/myInformation";

export default function useEditPreferenceTimeMutation() {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: editPreferredTime,
    onSuccess: () => {
      queryClient.invalidateQueries(myInformationQueries.summary());
    },
  });

  return { editPreferenceTime: mutate, ...rest };
}
