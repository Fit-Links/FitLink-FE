import { userEvent } from "@testing-library/user-event";

import { render, screen } from "test-utils";

import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "../Dropdown";

describe("Dropdown Component", () => {
  describe("상호작용 테스트", () => {
    it("트리거 클릭 시 드랍다운이 열리고 닫힘", async () => {
      render(
        <Dropdown>
          <DropdownTrigger>트리거</DropdownTrigger>
          <DropdownContent data-testid="dropdown-content">
            <DropdownItem>아이템 1</DropdownItem>
            <DropdownItem>아이템 2</DropdownItem>
          </DropdownContent>
        </Dropdown>,
      );

      const trigger = screen.getByRole("button");
      const content = screen.getByTestId("dropdown-content");

      expect(content).toHaveClass("opacity-0");

      await userEvent.click(trigger);
      expect(content).toHaveClass("opacity-100");

      await userEvent.click(trigger);
      expect(content).toHaveClass("opacity-0");
    });

    it("드랍다운 외부 클릭 시 드랍다운이 닫힘", async () => {
      render(
        <Dropdown>
          <DropdownTrigger>트리거</DropdownTrigger>
          <DropdownContent data-testid="dropdown-content">
            <DropdownItem>아이템 1</DropdownItem>
            <DropdownItem>아이템 2</DropdownItem>
          </DropdownContent>
        </Dropdown>,
      );

      const trigger = screen.getByRole("button");
      const content = screen.getByTestId("dropdown-content");

      await userEvent.click(trigger);
      expect(content).toHaveClass("opacity-100");

      await userEvent.click(document.body);
      expect(content).toHaveClass("opacity-0");
    });
  });

  describe("제어 방식 테스트", () => {
    it("상위에서 open Prop으로 상태를 제어할 수 있고, 상태 변경 시 onChangeProp 콜백이 호출되는지 확인한다.", async () => {
      const mockOnChangeOpen = jest.fn();

      render(
        <Dropdown open={false} onChangeOpen={mockOnChangeOpen}>
          <DropdownTrigger>트리거</DropdownTrigger>
          <DropdownContent data-testid="dropdown-content">
            <DropdownItem>아이템 1</DropdownItem>
            <DropdownItem>아이템 2</DropdownItem>
          </DropdownContent>
        </Dropdown>,
      );

      const trigger = screen.getByRole("button");

      await userEvent.click(trigger);

      expect(mockOnChangeOpen).toHaveBeenCalledWith(true);
    });
  });
  describe("비제어 방식 테스트", () => {
    it("상위에서 open 상태를 제어하지 않을 때, Dropdown 컴포넌트가 내부적으로 상태를 관리하고 상태 변경 시 onChangeProp 콜백이 호출되는지 확인한다.", async () => {
      const mockOnChangeOpen = jest.fn();

      render(
        <Dropdown defaultOpen={false} onChangeOpen={mockOnChangeOpen}>
          <DropdownTrigger>트리거</DropdownTrigger>
          <DropdownContent data-testid="dropdown-content">
            <DropdownItem>아이템 1</DropdownItem>
            <DropdownItem>아이템 2</DropdownItem>
          </DropdownContent>
        </Dropdown>,
      );

      const trigger = screen.getByRole("button");

      await userEvent.click(trigger);

      expect(mockOnChangeOpen).toHaveBeenCalledWith(true);
    });
  });
});
