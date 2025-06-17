import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userManagementBaseKeys } from "@trainer/queries/userManagement";

import { SessionCountEditRequestBody } from "@trainer/services/types/userManagement.dto";
import { sessionCountEdit } from "@trainer/services/userManagement";

export default function useSessionCountEditMutation() {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({
      memberId,
      sessionInfoId,
      editSessionCount,
    }: {
      memberId: number;
      sessionInfoId: number;
      editSessionCount: SessionCountEditRequestBody;
    }) =>
      sessionCountEdit({
        requestPath: {
          memberId: Number(memberId),
          sessionInfoId: Number(sessionInfoId),
        },
        requestBody: {
          ...editSessionCount,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userManagementBaseKeys.lists() });
    },
  });

  return {
    mutate,
    ...rest,
  };
}
