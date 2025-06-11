import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userManagementBaseKeys } from "@trainer/queries/userManagement";

import { unLinkMember } from "@trainer/services/userManagement";

export default function useUnlinkMember() {
  const queryClient = useQueryClient();

  const { mutate: unlinkMemeber, ...rest } = useMutation({
    mutationFn: unLinkMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userManagementBaseKeys.all });
    },
  });

  return {
    unlinkMemeber,
    ...rest,
  };
}
