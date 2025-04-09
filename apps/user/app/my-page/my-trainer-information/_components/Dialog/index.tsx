import { Button } from "@ui/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/Dialog";
import React from "react";

interface UnlinkDialogProps {
  children: React.ReactNode;
  onClickUnlinkTrainer: () => void;
}

export default function UnlinkDialog({ children, onClickUnlinkTrainer }: UnlinkDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>트레이너와 연동 해제하시겠습니까?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} className="h-[2.5rem] w-full">
              닫기
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant={"brand"} className="h-[2.5rem] w-full" onClick={onClickUnlinkTrainer}>
              해제
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
