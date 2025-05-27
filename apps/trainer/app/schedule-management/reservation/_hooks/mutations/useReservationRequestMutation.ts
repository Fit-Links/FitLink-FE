import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reservationBaseKeys } from "@trainer/queries/reservation";

import { createDirectReservation } from "@trainer/services/reservations";
import { DirectReservationRequestBody } from "@trainer/services/types/reservations.dto";

export const useReservationRequestMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({ trainerId, memberId, name, dates }: DirectReservationRequestBody) =>
      createDirectReservation({ trainerId, memberId, name, dates }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationBaseKeys.lists() });
    },
  });

  return { reservationRequest: mutate, ...rest };
};
