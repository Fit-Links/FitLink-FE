import type { Meta, StoryObj } from "@storybook/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@5unwan/ui/components/Accordion/index";
import { Calendar, Dumbbell, HeartHandshake } from "lucide-react";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  tags: ["autodocs"],
  args: {
    type: "multiple",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
  },
};

export default meta;

type AccordionStory = StoryObj<typeof Accordion>;

export const Default: AccordionStory = {
  args: {
    type: "multiple",
  },
  render: (args) => (
    <div className="bg-background-sub2 w-72 p-6">
      <Accordion className="w-full" {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span>회원 연동</span>
            <span className="bg-background-sub4 w-7 rounded-full text-center">5</span>
          </AccordionTrigger>
          <AccordionContent>
            <span>연동 승인</span>
            <span className="bg-background-sub4 w-7 rounded-full text-center">3</span>
          </AccordionContent>
          <AccordionContent>
            <span>연동 해제</span>
            <span className="bg-background-sub4 w-7 rounded-full text-center">2</span>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>PT 수업</AccordionTrigger>
          <AccordionContent>연동 해제</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>PT 예약</AccordionTrigger>
          <AccordionContent>예약 요청</AccordionContent>
          <AccordionContent>예약 변경/취소</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const WithSingle: AccordionStory = {
  args: {
    type: "single",
  },
  render: (args) => (
    <div className="bg-background-sub2 w-72 p-6">
      <Accordion className="w-full" {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger icon={<HeartHandshake />}>
            <span>회원 연동</span>
            <span className="bg-background-sub4 w-7 rounded-full text-center">5</span>
          </AccordionTrigger>
          <AccordionContent>
            <span>연동 승인</span>
            <span className="bg-background-sub4 w-7 rounded-full text-center">3</span>
          </AccordionContent>
          <AccordionContent>
            <span>연동 해제</span>
            <span className="bg-background-sub4 w-7 rounded-full text-center">2</span>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger icon={<Dumbbell />}>PT 수업</AccordionTrigger>
          <AccordionContent>연동 해제</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger icon={<Calendar />}>PT 예약</AccordionTrigger>
          <AccordionContent>예약 요청</AccordionContent>
          <AccordionContent>예약 변경/취소</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const WithIcon: AccordionStory = {
  args: {
    type: "multiple",
  },
  render: (args) => (
    <div className="bg-background-sub2 w-72 p-6">
      <Accordion className="w-full" {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger icon={<HeartHandshake />}>
            <span>회원 연동</span>
            <span className="bg-background-sub4 w-7 rounded-full text-center">5</span>
          </AccordionTrigger>
          <AccordionContent>
            <span>연동 승인</span>
            <span className="bg-background-sub4 w-7 rounded-full text-center">3</span>
          </AccordionContent>
          <AccordionContent>
            <span>연동 해제</span>
            <span className="bg-background-sub4 w-7 rounded-full text-center">2</span>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger icon={<Dumbbell />}>PT 수업</AccordionTrigger>
          <AccordionContent>연동 해제</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger icon={<Calendar />}>PT 예약</AccordionTrigger>
          <AccordionContent>예약 요청</AccordionContent>
          <AccordionContent>예약 변경/취소</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
