import { useMutation, useQueryClient } from "@tanstack/react-query";

import { baseReservationKeys } from "@user/queries/reservation";

import { reservationChange } from "@user/services/reservations";

type ReservationChangeMutationParams = {
  reservationId: number;
  reservationDate: string;
  changeRequestDate: string;
};

export const useReservationChangeMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({
      reservationId,
      reservationDate,
      changeRequestDate,
    }: ReservationChangeMutationParams) =>
      reservationChange({ reservationId }, { reservationDate, changeRequestDate }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: baseReservationKeys.lists() });
    },
  });

  return { reservationChange: mutate, ...rest };
};
