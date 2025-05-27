import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reservationBaseKeys } from "@trainer/queries/reservation";

import { createApproveReservation } from "@trainer/services/reservations";

type ReservationApproveMutationParams = {
  reservationId: number;
  memberId: number;
  reservationDate: string;
};

export const useReservationApproveMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({ reservationId, memberId, reservationDate }: ReservationApproveMutationParams) =>
      createApproveReservation({ reservationId }, { memberId, reservationDate }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationBaseKeys.lists() });
    },
  });

  return { reservationApprove: mutate, ...rest };
};
