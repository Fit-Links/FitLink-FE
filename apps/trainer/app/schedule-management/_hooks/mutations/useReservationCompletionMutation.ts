/* eslint-disable no-magic-numbers */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reservationBaseKeys } from "@trainer/queries/reservation";

import { createCompletedPt } from "@trainer/services/reservations";

type ReservationCompletionMutationParams = {
  memberId: number;
  reservationId: number;
  isJoin: boolean;
};

export const useReservationCompletionMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({ memberId, reservationId, isJoin }: ReservationCompletionMutationParams) =>
      createCompletedPt({ reservationId }, { memberId, isJoin }),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: reservationBaseKeys.lists() });
      }, 500);
    },
  });

  return { reservationCompletion: mutate, ...rest };
};
