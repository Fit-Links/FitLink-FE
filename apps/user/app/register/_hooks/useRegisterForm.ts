import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { myInformationBaseKeys } from "@user/queries/myInformation";

import { saveTokens, signup } from "@user/services/auth";

import RouteInstance from "@user/constants/routes";

export const useRegisterForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: saveUserTokens, isPending: saveUserTokensPending } = useMutation({
    mutationFn: saveTokens,
    onError: () => {
      toast.error("예상하지 못한 오류가 발생했습니다. 회원가입/로그인을 다시 시대해주세요");
      router.replace(RouteInstance.login());
    },
  });
  const { mutateAsync: signupUser, isPending: signupUserPending } = useMutation({
    mutationFn: signup,
    onSuccess: async ({ data }) => {
      queryClient.invalidateQueries({ queryKey: myInformationBaseKeys.all });

      saveUserTokens(data);
    },
  });

  return {
    onSubmit: signupUser,
    isPending: saveUserTokensPending || signupUserPending,
  };
};
