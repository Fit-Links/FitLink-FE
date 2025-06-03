import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reservationBaseKeys } from "@trainer/queries/reservation";

import { terminateFixedReservation } from "@trainer/services/reservations";

export const useFixedReservationTerminateMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (reservationId: number) => terminateFixedReservation({ reservationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationBaseKeys.lists() });
    },
  });

  return { terminateFixedReservation: mutate, ...rest };
};
