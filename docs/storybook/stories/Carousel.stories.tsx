import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@5unwan/ui/components/Carousel";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Carousel의 방향을 결정합니다",
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-background-primary flex justify-center p-10">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Carousel>;
export const Default: Story = {
  render: function Render(args) {
    return (
      <Carousel className="border-text-primary w-[800px]" {...args}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="">
              <div className="text-text-primary border-text-sub1 flex w-full items-center justify-center rounded-md border border-solid">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  },
};

export const WithoutButtons: Story = {
  render: function Render(args) {
    return (
      <Carousel className="border-text-primary w-[800px]" {...args}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="">
              <div className="text-text-primary border-text-sub1 flex w-full items-center justify-center rounded-md border border-solid">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  },
};

export const Vertical: Story = {
  render: function Render(args) {
    return (
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full max-w-xs"
        {...args}
      >
        <CarouselContent className="-mt-1 h-[200px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
              <div className="text-text-primary flex items-center justify-center rounded-md border border-solid p-1">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  },
};
