import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reservationBaseKeys } from "@trainer/queries/reservation";

import { editFixedReservation } from "@trainer/services/reservations";
import {
  EditFixedReservationRequestBody,
  EditFixedReservationRequestPath,
} from "@trainer/services/types/reservations.dto";

type FixReservationChangeMutationProps = EditFixedReservationRequestPath &
  EditFixedReservationRequestBody;

export const useFixReservationChangeMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({
      reservationId,
      reservationDate,
      changeRequestDate,
    }: FixReservationChangeMutationProps) =>
      editFixedReservation({
        requestPath: { reservationId },
        requestBody: { reservationDate, changeRequestDate },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationBaseKeys.lists() });
    },
  });

  return { fixReservationChange: mutate, ...rest };
};
