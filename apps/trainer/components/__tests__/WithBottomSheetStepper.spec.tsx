/* eslint-disable no-magic-numbers */
import userEvent from "@testing-library/user-event";
import { Button } from "@ui/components/Button";

import { render, screen } from "test-utils";

import { WithBottomSheetStepper } from "@trainer/components/WithBottomSheetStepper";

type WrappedComponentProps = {
  value: number;
  onChangeOpen: (isOpen: boolean) => void;
};

function MockComponent({ value, onChangeOpen }: WrappedComponentProps) {
  return (
    <div>
      <p data-testid="step-value">Step Value: {value}</p>
      <Button onClick={() => onChangeOpen(false)}>승인</Button>
    </div>
  );
}

const BottomSheetWithStepper = WithBottomSheetStepper(MockComponent);

describe("WithBottomSheetStepper", () => {
  it("트리거를 클릭하면 바텀시트가 열려야 한다.", async () => {
    render(
      <BottomSheetWithStepper title="Test Title" description="Test Description">
        <Button>Open Bottom Sheet</Button>
      </BottomSheetWithStepper>,
    );

    expect(screen.queryByText("Step Value: 0")).not.toBeInTheDocument();

    await userEvent.click(screen.getByText("Open Bottom Sheet"));

    expect(screen.getByText("Step Value: 0")).toBeInTheDocument();
  });

  it("증가 버튼을 클릭하면 step 값이 올바르게 증가해야 한다.", async () => {
    render(
      <BottomSheetWithStepper
        title="Test Title"
        description="Test Description"
        incrementOptions={[5, 10, 15]}
      >
        <Button>Open Bottom Sheet</Button>
      </BottomSheetWithStepper>,
    );

    await userEvent.click(screen.getByText("Open Bottom Sheet"));

    let stepValue = 0;

    await userEvent.click(screen.getByText("+5회"));
    stepValue += 5;
    expect(screen.getByTestId("step-value")).toHaveTextContent(`Step Value: ${stepValue}`);

    await userEvent.click(screen.getByText("+10회"));
    stepValue += 10;
    expect(screen.getByTestId("step-value")).toHaveTextContent(`Step Value: ${stepValue}`);

    await userEvent.click(screen.getByText("+15회"));
    stepValue += 15;
    expect(screen.getByTestId("step-value")).toHaveTextContent(`Step Value: ${stepValue}`);
  });

  it("onChangeOpen이 호출되어 바텀시트를 닫아야 한다.", async () => {
    render(
      <BottomSheetWithStepper title="Test Title" description="Test Description">
        <Button>Open Bottom Sheet</Button>
      </BottomSheetWithStepper>,
    );

    await userEvent.click(screen.getByText("Open Bottom Sheet"));

    expect(screen.getByText("Step Value: 0")).toBeInTheDocument();

    await userEvent.click(screen.getByText("승인"));

    expect(screen.queryByText("Step Value: 0")).not.toBeInTheDocument();
  });
});
