"use client";

import { Button } from "./Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./Dialog";
import { Switch } from "./Switch";

type PushPermissionSwitchProps = {
  checked: boolean;
  onChecked: (checked: boolean) => void;
  isDialogOpen?: boolean;
  setIsDialogOpen?: (open: boolean) => void;
  dialogDescription?: string;
};
function PushPermissionSwitch({
  checked,
  onChecked,
  isDialogOpen,
  setIsDialogOpen,
  dialogDescription,
}: PushPermissionSwitchProps) {
  return (
    <>
      <Switch checked={checked} onCheckedChange={onChecked} />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>푸시 알림 재설정 안내</DialogTitle>
            <DialogDescription>
              푸시 알림을 다시 설정하려면
              <br />
              {dialogDescription}
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button size="lg" className="w-full">
              확인
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PushPermissionSwitch;
