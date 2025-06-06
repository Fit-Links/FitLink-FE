import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@ui/components/Dialog";
import React from "react";

import { myInformationQueries } from "@trainer/queries/myInformation";

import { deleteTimeOff } from "@trainer/services/myInformation";
import { DeleteTimeOffRequestBody } from "@trainer/services/types/myInformation.dto";

import { RequestDayOffInformation } from "../MyDayOffContainer";

type DeleteMyDayOffDialogProps = {
  deleteDayOffData: RequestDayOffInformation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeleteMyDayOffDialog({
  deleteDayOffData,
  open,
}: DeleteMyDayOffDialogProps) {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: (params: {
      requestPath: { dayOffId: number };
      requestBody: DeleteTimeOffRequestBody;
    }) => deleteTimeOff(params.requestPath, params.requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myInformationQueries.dayOff().queryKey });
    },
  });

  const handleDeleteDayOff = () => {
    if (!deleteDayOffData) return;

    mutate(
      {
        requestPath: { dayOffId: deleteDayOffData.dayOffId },
        requestBody: {
          dayOfWeek: deleteDayOffData.dayOfWeek,
          dayOfTime: deleteDayOffData.dayOffDate,
        },
      },
      {
        onSuccess: () => {
          if (isSuccess) {
            console.log("성공적으로 삭제되었습니다.");
          }
        },
        onError: (error) => {
          if (isError) {
            console.error("삭제 중 오류가 발생했습니다:", error);
          }
        },
      },
    );
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        {/* <DialogTitle className="w-full text-center">휴무일을 삭제하시겠습니까?</DialogTitle> */}
        <DialogDescription className="text-headline text-text-primary w-full text-center">
          휴무일을 삭제하시겠습니까?
        </DialogDescription>
        <DialogFooter>
          <Button className="flex w-full flex-1" variant="brand" onClick={handleDeleteDayOff}>
            삭제
          </Button>
          <DialogClose asChild>
            <Button className="flex w-full flex-1" variant="outline">
              취소
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
