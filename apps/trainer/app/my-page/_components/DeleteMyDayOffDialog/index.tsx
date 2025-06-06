import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@ui/components/Dialog";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

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
  onOpenChange,
}: DeleteMyDayOffDialogProps) {
  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useMutation({
    mutationFn: (params: {
      requestPath: { dayOffId: number };
      requestBody: DeleteTimeOffRequestBody;
    }) => deleteTimeOff(params.requestPath, params.requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myInformationQueries.dayOff().queryKey });
      onOpenChange(false);
    },
    onError: () => {
      toast.error("삭제 중 오류가 발생했습니다.");
    },
  });

  const handleDeleteDayOff = () => {
    if (!deleteDayOffData) return;

    mutate({
      requestPath: { dayOffId: deleteDayOffData.dayOffId },
      requestBody: {
        dayOfWeek: deleteDayOffData.dayOfWeek,
        dayOfTime: deleteDayOffData.dayOffDate,
      },
    });
  };

  useEffect(() => {
    console.log(isSuccess);
  }, [isSuccess]);

  const handleClickCloseDialog = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle className="w-full text-center">휴무일을 삭제하시겠습니까?</DialogTitle>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="flex w-full flex-1" variant="brand" onClick={handleDeleteDayOff}>
              삭제
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="flex w-full flex-1"
              variant="outline"
              onClick={handleClickCloseDialog}
            >
              취소
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
