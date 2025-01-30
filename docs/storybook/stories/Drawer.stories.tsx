import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@5unwan/ui/components/Drawer";
import { Meta, StoryObj } from "@storybook/react";

import { X } from "lucide-react";

const meta: Meta = {
  component: Drawer,
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild={true}>
        <button>Open</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <div className="text-title-1 flex items-center justify-between">
              알림
              <DrawerClose className="text-[20px]">
                <X />
              </DrawerClose>
            </div>
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  ),
};
