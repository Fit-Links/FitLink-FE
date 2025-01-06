import { Input } from "@5unwan/ui/components/Input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@5unwan/ui/components/Sheet";
import { Meta, StoryObj } from "@storybook/react";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

function SheetSide() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <button>{side}</button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>예약 취소</SheetTitle>
              <SheetDescription>예약을 취소하려는 사유를 입력해주세요</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input id="name" value="Pedro Duarte" className="w-full col-span-3 sm:col-span-2" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="username" className="text-right">
                  Username
                </label>
                <Input id="username" value="@peduarte" className="w-full col-span-3 sm:col-span-2" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <button type="submit">Save changes</button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}

const meta: Meta<typeof SheetContent> = {
  component: Sheet,
  argTypes: {
    side: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right']
    }
  },
  args: {
    side: 'bottom'  
  }
};
export default meta;

type Story = StoryObj<typeof SheetContent>;

export const Default: Story = {
  render: ({side,...args}) => (
    <Sheet>
      <SheetTrigger asChild>
        <button>시트 열기</button>
      </SheetTrigger>
      <SheetContent side={side}>
        <div className="border border-solid border-background-sub5">Sheet Content</div>
      </SheetContent>
    </Sheet>
  ),
};
export const WithHeader: Story = {
  render: ({side,...args}) => (
    <Sheet>
      <SheetTrigger asChild>
        <button>시트 열기</button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader className="border border-solid border-background-sub5">
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet Description</SheetDescription>
        </SheetHeader>
        <div className="border border-solid border-background-sub5">Sheet Content</div>
      </SheetContent>
    </Sheet>
  ),
};
export const WithFooter: Story = {
  render: ({side,...args}) => (
    <Sheet>
      <SheetTrigger asChild>
        <button>시트 열기</button>
      </SheetTrigger>
      <SheetContent side={side}>
        <div className="border border-solid border-background-sub5">Sheet Content</div>
        <SheetFooter className="border border-solid border-background-sub5">
          <div>Sheet Footer</div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
export const WithHeaderFooter: Story = {
  render: ({side,...args}) => (
    <Sheet>
      <SheetTrigger asChild>
        <button>시트 열기</button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader className="border border-solid border-background-sub5">
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet Description</SheetDescription>
        </SheetHeader>
        <div className="border border-solid border-background-sub5">Sheet Content</div>
        <SheetFooter className="border border-solid border-background-sub5">
          <div>Sheet Footer</div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
export const AllDirections: Story = {
  render: () => <SheetSide />
}
