import { useMutation, useQueryClient } from "@tanstack/react-query";

import { myInformationBaseKeys } from "@user/queries/myInformation";

import { signup } from "@user/services/auth";

export const useRegisterForm = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, status } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myInformationBaseKeys.all() });
    },
  });

  return {
    onSubmit: mutateAsync,
    status,
  };
};
