import { useMutation, useQueryClient } from "@tanstack/react-query";

import { myInformationBaseKeys } from "@user/queries/myInformation";

import { signup } from "@user/services/auth";
import { SignupRequestBody } from "@user/services/types/auth.dto";

export const useRegisterForm = () => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myInformationBaseKeys.all() });
    },
  });

  const onSubmit = async (data: SignupRequestBody) => {
    const { attachmentId, name, gender, birthDate, workoutSchedule } = data;
    mutate({
      attachmentId: attachmentId!,
      name: name!,
      gender: gender!,
      birthDate: birthDate!,
      workoutSchedule: workoutSchedule!,
    });
  };

  return {
    onSubmit,
    status,
  };
};
