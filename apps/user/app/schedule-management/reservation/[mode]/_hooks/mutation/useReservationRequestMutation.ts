import { useMutation, useQueryClient } from "@tanstack/react-query";

import { baseReservationKeys } from "@user/queries/reservation";

import { directReservation } from "@user/services/reservations";
import { DirectReservationRequestBody } from "@user/services/types/reservations.dto";

export const useReservationRequestMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, ...reset } = useMutation({
    mutationFn: ({ trainerId, memberId, name, dates }: DirectReservationRequestBody) =>
      directReservation({ trainerId, memberId, name, dates }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: baseReservationKeys.lists() });
    },
  });

  return { reservationRequest: mutate, ...reset };
};
