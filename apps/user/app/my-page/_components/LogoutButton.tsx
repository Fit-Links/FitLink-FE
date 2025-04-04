import { Badge } from "@ui/components/Badge";
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
import { useRouter } from "next/navigation";
import React from "react";

import { ROUTE } from "../_constants/route";

export default function LogoutButton() {
  const router = useRouter();

  const handleClickLogout = () => {
    // TODO
    // 로그아웃 요청
    router.push(ROUTE.LOGIN);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Badge variant="sub2" className="px-4">
          로그아웃
        </Badge>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>로그아웃을 하시겠습니까?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full" variant="secondary">
              취소
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="w-full" onClick={handleClickLogout}>
              로그아웃
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
