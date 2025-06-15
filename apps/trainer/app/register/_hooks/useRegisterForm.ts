import { useMutation, useQueryClient } from "@tanstack/react-query";

import { myInformationBaseKeys } from "@trainer/queries/myInformation";

import { signup } from "@trainer/services/auth";

export const useRegisterForm = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, status } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myInformationBaseKeys.all });
    },
  });

  return {
    onSubmit: mutateAsync,
    status,
  };
};
