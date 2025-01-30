import type { Meta, StoryObj } from "@storybook/react";

import { Popup, PopupButtonGroup, PopupContent, PopupTitle } from "@5unwan/ui/components/PopUp";
import { cn } from "../../../packages/ui/src/lib/utils";
import { useState } from "react";
import { Badge } from "@5unwan/ui/components/Badge";

const meta: Meta<typeof Popup> = {
  component: Popup,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Popup>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative h-[300px] w-screen">
        <Badge variant="brand" onClick={() => setOpen(true)}>
          Open
        </Badge>
        <Popup open={open}>
          <PopupContent container={document.querySelector("#story--popup--default--primary")}>
            <PopupTitle>
              예정되어 있는 PT 수업 시간을
              <br />
              삭제하시겠습니까?
            </PopupTitle>
            <PopupButtonGroup>
              <div
                className={cn(
                  "text-headline focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                  "bg-background-sub1 text-text-primary hover:bg-background-sub2 shadow",
                  "text-headline h-[2.5rem] px-[2.625rem]",
                )}
                onClick={() => setOpen(false)}
              >
                취소
              </div>
              <div
                className={cn(
                  "text-headline focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                  "bg-brand-primary-500 text-text-primary hover:bg-brand-primary-500/90 shadow",
                  "text-headline h-[2.5rem] px-[2.625rem]",
                )}
                onClick={() => setOpen(false)}
              >
                삭제
              </div>
            </PopupButtonGroup>
          </PopupContent>
        </Popup>
      </div>
    );
  },
};
