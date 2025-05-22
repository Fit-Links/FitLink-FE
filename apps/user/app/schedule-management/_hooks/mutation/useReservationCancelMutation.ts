import { useMutation, useQueryClient } from "@tanstack/react-query";

import { baseReservationKeys } from "@user/queries/reservation";

import { cancelReservation } from "@user/services/reservations";

type ReservationCancelMutationParams = {
  reservationId: number;
  cancelReason: string;
  cancelDate: string;
};

export const useReservationCancelMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({ reservationId, cancelDate, cancelReason }: ReservationCancelMutationParams) =>
      cancelReservation({ reservationId }, { cancelReason, cancelDate }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: baseReservationKeys.lists() });
    },
  });

  return { reservationCancel: mutate, ...rest };
};
