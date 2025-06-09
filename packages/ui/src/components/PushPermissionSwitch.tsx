"use client";

import { useEffect, useState, useRef } from "react";

import { getEnvironment } from "@ui/utils/getEnvironment";

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

function PushPermissionSwitch() {
  const [isNotificationGranted, setIsNotificationGranted] = useState(false);
  const [isDialopOpen, setIsDialogOpen] = useState(false);

  const environmentRef = useRef<ReturnType<typeof getEnvironment>>("desktop-web");

  useEffect(() => {
    if (typeof Notification !== "undefined") {
      setIsNotificationGranted(Notification.permission === "granted");
    }
    if (typeof navigator !== "undefined") {
      environmentRef.current = getEnvironment();
    }
  }, []);

  useEffect(() => {
    if (isNotificationGranted) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setIsNotificationGranted(true);
        } else {
          setIsNotificationGranted(false);
        }
      });
    }
  }, [isNotificationGranted]);

  const isMobilePwa = environmentRef.current === "mobile-pwa";

  const handleToggle = (isNotificationGranted: boolean) => {
    if (!isNotificationGranted) {
      setIsDialogOpen(true);

      return;
    }
    setIsNotificationGranted(isNotificationGranted);
  };

  const dialogDescription = `${isMobilePwa ? "앱 시스템 설정" : "브라우저 환경설정"}에서 [알림] 스위치를 꺼주세요`;

  return (
    <>
      <Switch checked={isNotificationGranted} onCheckedChange={handleToggle} />
      <Dialog open={isDialopOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>푸시 알림 해제 안내</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
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
