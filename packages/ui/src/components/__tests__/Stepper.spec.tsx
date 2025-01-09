import userEvent from "@testing-library/user-event";

import { render, screen } from "test-utils";

import Stepper from "../Stepper";

describe("Stepper Component", () => {
  const mockGetChangeValue = jest.fn();
  const DEFAULT_VALUE = 0;
  const TEST_STEP = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("제어 방식 테스트", () => {
    it("+ 버튼 클릭을 통해 onChange 함수가 defaultValue에서 step 만큼 더한 값을 인수로 하여 실행된다.", async () => {
      render(<Stepper step={TEST_STEP} value={DEFAULT_VALUE} onChangeValue={mockGetChangeValue} />);

      const increaseButton = screen.getByLabelText("increase");

      await userEvent.click(increaseButton);

      expect(mockGetChangeValue).toHaveBeenCalledWith(DEFAULT_VALUE + TEST_STEP);
    });

    it("- 버튼 클릭을 통해 onChange 함수가 defaultValue에서 step 만큼 뺀 값을 인수로 하여 실행된다.", async () => {
      render(<Stepper step={TEST_STEP} value={DEFAULT_VALUE} onChangeValue={mockGetChangeValue} />);

      const decreaseButton = screen.getByLabelText("decrease");

      await userEvent.click(decreaseButton);

      expect(mockGetChangeValue).toHaveBeenCalledWith(DEFAULT_VALUE - TEST_STEP);
    });
  });

  describe("비제어 방식 테스트", () => {
    it("+ 버튼 클릭을 통해 onChange 함수가 defaultValue에서 step 만큼 더한 값을 인수로 하여 실행된다.", async () => {
      render(
        <Stepper
          step={TEST_STEP}
          defaultValue={DEFAULT_VALUE}
          onChangeValue={mockGetChangeValue}
        />,
      );

      const increaseButton = screen.getByLabelText("increase");

      await userEvent.click(increaseButton);

      expect(mockGetChangeValue).toHaveBeenCalledWith(DEFAULT_VALUE + TEST_STEP);
    });

    it("- 버튼 클릭을 통해 onChange 함수가 defaultValue에서 step 만큼 뺀 값을 인수로 하여 실행된다.", async () => {
      render(
        <Stepper
          step={TEST_STEP}
          defaultValue={DEFAULT_VALUE}
          onChangeValue={mockGetChangeValue}
        />,
      );

      const decreaseButton = screen.getByLabelText("decrease");

      await userEvent.click(decreaseButton);

      expect(mockGetChangeValue).toHaveBeenCalledWith(DEFAULT_VALUE - TEST_STEP);
    });
  });
});
