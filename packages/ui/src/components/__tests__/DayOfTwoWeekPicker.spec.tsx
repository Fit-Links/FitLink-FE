/* eslint-disable no-magic-numbers */
import { userEvent } from "@testing-library/user-event";
import { addDays, format, isWithinInterval, parseISO, subDays } from "date-fns";

import { render, screen } from "test-utils";

import DayOfTwoWeekPicker from "@ui/components/DayOfTwoWeekPicker";

describe("DayOfTwoWeekPicker Component test", () => {
  it("현재일로부터 14일에 범위 내의 날짜만 렌더링", () => {
    render(<DayOfTwoWeekPicker />);

    const currentDate = new Date();
    const fromDate = subDays(currentDate, 1);
    const toDate = addDays(fromDate, 14);

    const dateButtons = screen.getAllByTestId(/\d{4}-\d{2}-\d{2}/);
    expect(dateButtons).toHaveLength(14);

    dateButtons.forEach((btn) => {
      const buttonDate = parseISO(btn.getAttribute("data-testid") as string);
      expect(isWithinInterval(buttonDate, { start: fromDate, end: toDate })).toBe(true);
    });
  });

  it("보이는 날짜를 클릭하면 onSelectDate가 호출된다", async () => {
    const handleSelectDate = jest.fn();
    render(<DayOfTwoWeekPicker onSelectDate={handleSelectDate} />);

    const dayButtons = screen.getAllByRole("button");
    const visibleButtons = dayButtons.filter((btn) => !btn.classList.contains("invisible"));

    await userEvent.click(visibleButtons[0]);
    expect(handleSelectDate).toHaveBeenCalledTimes(1);

    const clickedDayText = visibleButtons[0].textContent;
    expect(format(handleSelectDate.mock.calls[0][0], "d")).toBe(clickedDayText);
  });
});
