import { useMutation } from "@tanstack/react-query";

import { reservationChange } from "@user/services/reservations";

type ReservationChangeMutationParams = {
  reservationId: number;
  reservationDate: string;
  changeRequestDate: string;
};

export const useReservationChangeMutation = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: ({
      reservationId,
      reservationDate,
      changeRequestDate,
    }: ReservationChangeMutationParams) =>
      reservationChange({ reservationId }, { reservationDate, changeRequestDate }),
  });

  return { reservationChange: mutate, ...rest };
};
