"use client";

import { MutateOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { signup } from "@trainer/services/auth";
import { SignupApiResponse, SignupRequestBody } from "@trainer/services/types/auth.dto";

export const useSignupForm = (
  persistentOptions?: Omit<
    MutateOptions<SignupApiResponse, AxiosError, SignupRequestBody, unknown>,
    "mutationFn"
  >,
) => {
  const {
    error,
    mutate,
    status: networkStatus,
    data,
  } = useMutation({
    mutationFn: signup,
    ...persistentOptions,
  });

  const onSubmit = (
    signupForm: SignupRequestBody,
    options?: MutateOptions<SignupApiResponse, AxiosError, SignupRequestBody, unknown>,
  ) => {
    mutate(signupForm, options);
  };

  return { onSubmit, networkStatus, data, error };
};
