"use client";

import { setLocalStorage } from "@5unwan/core/utils/localStorage";
import { MutateOptions, useMutation } from "@tanstack/react-query";

import { signup } from "@user/services/auth";
import { SignupApiResponse, SignupRequestBody } from "@user/services/types/auth.dto";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@user/constants/token";

export const useSignupForm = () => {
  const { mutate, status } = useMutation({
    mutationFn: (signupInfo: SignupRequestBody) => signup(signupInfo),
    onSuccess: ({ data }) => {
      const { accessToken, refreshToken } = data;
      setLocalStorage(ACCESS_TOKEN_KEY, accessToken);
      setLocalStorage(REFRESH_TOKEN_KEY, refreshToken);
    },
  });

  const onSubmit = (
    signupForm: SignupRequestBody,
    options?: MutateOptions<SignupApiResponse, Error, SignupRequestBody, unknown>,
  ) => {
    mutate(signupForm, options);
  };

  return { onSubmit, status };
};
