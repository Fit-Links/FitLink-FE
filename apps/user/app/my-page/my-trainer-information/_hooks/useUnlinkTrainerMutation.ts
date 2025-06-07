import { useMutation, useQueryClient } from "@tanstack/react-query";

import { myInformationQueries } from "@user/queries/myInformation";

import { disconnectTrainer } from "@user/services/myInformation";

export default function useUnlinkTrainerMutation() {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: () => disconnectTrainer(),
    onSuccess: () => {
      queryClient.invalidateQueries(myInformationQueries.summary());
    },
  });

  return { unlinkTrainer: mutate, ...rest };
}
