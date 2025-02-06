/* eslint-disable no-magic-numbers */
import userEvent from "@testing-library/user-event";

import { render, screen, within } from "test-utils";

import TimeCellToggleGroup from "@ui/components/TimeCellToggleGroup";

import { TimeCell } from "@ui/utils/timeCellUtils";

const mockTimeCells: TimeCell[] = [
  { dayOfWeek: "MON", time: "08:00", disabled: false },
  { dayOfWeek: "MON", time: "09:00", disabled: false },
  { dayOfWeek: "MON", time: "18:00", disabled: false },
  { dayOfWeek: "MON", time: "19:00", disabled: true },
];

describe("TimeCellToggleGroup Component", () => {
  test("모든 timeCellInfo 항목을 TimeCell로 렌더링한다", () => {
    render(
      <TimeCellToggleGroup
        selected={[]}
        onSelectedChange={jest.fn()}
        timeCellInfo={mockTimeCells}
      />,
    );

    mockTimeCells.forEach(({ time }) => {
      expect(screen.getByText(time)).toBeInTheDocument();
    });
  });

  test("TimCellToggleItem을 선택할 수 있다", async () => {
    const handleSelectionChange = jest.fn();
    const user = userEvent.setup();
    render(
      <TimeCellToggleGroup
        selected={[]}
        onSelectedChange={handleSelectionChange}
        timeCellInfo={mockTimeCells}
      />,
    );

    await user.click(screen.getByText("08:00"));
    expect(handleSelectionChange).toHaveBeenCalledWith(["08:00"]);
  });

  test("disabled된 TimeCellToggleItem은 선택할 수 없다", async () => {
    const handleSelectionChange = jest.fn();
    const user = userEvent.setup();
    render(
      <TimeCellToggleGroup
        selected={[]}
        onSelectedChange={handleSelectionChange}
        timeCellInfo={mockTimeCells}
      />,
    );

    await user.click(screen.getByText("19:00"));
    expect(handleSelectionChange).not.toHaveBeenCalled();
  });

  test("toggleLimit 이상의 TimeCellToggleItem을 선택할 수 없다", async () => {
    const handleSelectionChange = jest.fn();
    const handleExceedLimit = jest.fn();
    const user = userEvent.setup();
    render(
      <TimeCellToggleGroup
        selected={["08:00"]}
        onSelectedChange={handleSelectionChange}
        onExceedToggleLimit={handleExceedLimit}
        timeCellInfo={mockTimeCells}
        toggleLimit={1}
      />,
    );

    await user.click(screen.getByText("09:00"));
    expect(handleExceedLimit).toHaveBeenCalled();
    expect(handleSelectionChange).toHaveBeenCalledTimes(0);
  });

  test("선택한 TimeCellToggleItem에 할당되는 우선순위가 올바르게 계산된다", () => {
    const { rerender } = render(
      <TimeCellToggleGroup
        selected={["08:00", "18:00"]}
        onSelectedChange={jest.fn()}
        timeCellInfo={mockTimeCells}
        variant="notification"
      />,
    );

    const selectedTimes = ["08:00", "18:00"];
    selectedTimes.forEach((time, index) => {
      const dotWrapper = within(screen.getByTestId(time));
      expect(dotWrapper.getByText(String(index + 1))).toBeInTheDocument();
    });

    rerender(
      <TimeCellToggleGroup
        selected={["09:00", "18:00"]}
        onSelectedChange={jest.fn()}
        timeCellInfo={mockTimeCells}
        variant="notification"
      />,
    );

    expect(within(screen.getByTestId("09:00")).getByText("1")).toBeInTheDocument();
    expect(within(screen.getByTestId("18:00")).getByText("2")).toBeInTheDocument();
  });
});
