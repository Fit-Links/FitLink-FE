import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui/components/Drawer";
import { VisuallyHidden } from "@ui/components/VisuallyHidden";
import { Menu, X } from "lucide-react";

import NotificationAccordion from "./NotificationAccordion";

export default function NotificationSideBar() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Menu className="text-text-primary" />
      </DrawerTrigger>
      <DrawerContent className="w-[20.313rem] py-[1.5rem]">
        <DrawerHeader>
          <DrawerTitle className="m-0">
            <div className="text-title-1 flex items-center justify-between">
              알림
              <DrawerClose className="text-[1.25rem]">
                <X />
              </DrawerClose>
            </div>
          </DrawerTitle>
          <VisuallyHidden>
            <DrawerDescription>
              이 사이드바는 회원 연동, PT 수업, PT 예약에 대한 다양한 알림 종류를 선택하여 각각의
              알림 페이지로 이동할 수 있도록 도와줍니다.
            </DrawerDescription>
          </VisuallyHidden>
        </DrawerHeader>
        <NotificationAccordion />
      </DrawerContent>
    </Drawer>
  );
}
