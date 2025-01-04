import userEvent from "@testing-library/user-event";

import { render, screen } from "test-utils"; // 커스텀 render 사용

import Stepper from "../Stepper";

describe("Stepper Component", () => {
  const mockGetChangeValue = jest.fn();

  it("+ 버튼 클릭을 통해  onChange 함수가 실행된다.", async () => {
    render(<Stepper getChangeValue={mockGetChangeValue} />);

    const increaseButton = screen.getByLabelText("increase");

    await userEvent.click(increaseButton);

    expect(mockGetChangeValue).toHaveBeenCalled();
  });

  it("- 버튼 클릭을 통해  onChange 함수가 실행된다.", async () => {
    render(<Stepper getChangeValue={mockGetChangeValue} />);

    const decreaseButton = screen.getByLabelText("decrease");

    await userEvent.click(decreaseButton);

    expect(mockGetChangeValue).toHaveBeenCalled();
  });
});
