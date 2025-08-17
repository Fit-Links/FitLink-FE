/* eslint-disable no-magic-numbers */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reservationBaseKeys } from "@trainer/queries/reservation";

import { createReservationSetNotAvailable } from "@trainer/services/reservations";
import { ReservationSetNotAvailableRequestBody } from "@trainer/services/types/reservations.dto";

export const useReservationNotAllowMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({ date, reservationId }: ReservationSetNotAvailableRequestBody) =>
      createReservationSetNotAvailable({ date, reservationId }),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: reservationBaseKeys.lists() });
      }, 500);
    },
  });

  return { reservationNotAllow: mutate, ...rest };
};
