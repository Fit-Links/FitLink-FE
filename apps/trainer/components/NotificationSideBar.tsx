import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui/components/Drawer";
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
        </DrawerHeader>
        <NotificationAccordion />
      </DrawerContent>
    </Drawer>
  );
}
