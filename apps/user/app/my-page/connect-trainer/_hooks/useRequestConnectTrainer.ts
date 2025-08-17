import { useMutation, useQueryClient } from "@tanstack/react-query";

import { myInformationQueries } from "@user/queries/myInformation";

import { connectTrainer } from "@user/services/myInformation";

export default function useRequestConnectTrainer() {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: connectTrainer,
    onSuccess: () => {
      queryClient.invalidateQueries(myInformationQueries.summary());
    },
  });

  return { requestConnectTrainer: mutate, ...rest };
}
