/* eslint-disable no-magic-numbers */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reservationBaseKeys } from "@trainer/queries/reservation";

import { cancelReservation } from "@trainer/services/reservations";

type ReservationCancelMutationParams = {
  reservationId: number;
  cancelReason: string;
  cancelDate: string;
};

export const useReservationCancelMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({ reservationId, cancelReason, cancelDate }: ReservationCancelMutationParams) =>
      cancelReservation({
        requestPath: { reservationId },
        requestBody: { cancelReason, cancelDate },
      }),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: reservationBaseKeys.lists() });
      }, 500);
    },
  });

  return { reservationCancel: mutate, ...rest };
};
