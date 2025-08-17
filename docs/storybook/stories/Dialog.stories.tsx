import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@5unwan/ui/components/Dialog";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  component: Dialog,
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => 
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>트레이너에게 연동 요청 중입니다</DialogTitle>
          <DialogDescription>
            연동 승인 시 본 서비스를 이용하실 수 있습니다
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <button className="border border-white">확인</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}