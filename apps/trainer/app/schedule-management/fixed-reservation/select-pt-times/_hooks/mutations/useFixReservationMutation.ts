import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reservationBaseKeys } from "@trainer/queries/reservation";

import { createFixReservation } from "@trainer/services/reservations";
import { FixReservationRequestBody } from "@trainer/services/types/reservations.dto";

export const useFixReservationMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({ memberId, name, dates }: FixReservationRequestBody) =>
      createFixReservation({ memberId, name, dates }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationBaseKeys.lists() });
    },
  });

  return { fixReservation: mutate, ...rest };
};
