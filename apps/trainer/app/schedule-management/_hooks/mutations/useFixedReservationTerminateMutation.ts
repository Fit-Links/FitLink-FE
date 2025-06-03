/* eslint-disable no-magic-numbers */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reservationBaseKeys } from "@trainer/queries/reservation";

import { terminateFixedReservation } from "@trainer/services/reservations";

export const useFixedReservationTerminateMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (reservationId: number) => terminateFixedReservation({ reservationId }),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: reservationBaseKeys.lists() });
      }, 500);
    },
  });

  return { terminateFixedReservation: mutate, ...rest };
};
