import { useMutation } from "@tanstack/react-query";

import { editFixedReservation } from "@trainer/services/reservations";
import {
  EditFixedReservationRequestBody,
  EditFixedReservationRequestPath,
} from "@trainer/services/types/reservations.dto";

type FixReservationChangeMutationProps = EditFixedReservationRequestPath &
  EditFixedReservationRequestBody;

export const useFixReservationChangeMutation = () => {
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
  });

  return { fixReservationChange: mutate, ...rest };
};
