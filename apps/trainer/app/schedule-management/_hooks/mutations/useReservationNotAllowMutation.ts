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
      queryClient.invalidateQueries({ queryKey: reservationBaseKeys.lists() });
    },
  });

  return { reservationNotAllow: mutate, ...rest };
};
