import { render, screen } from "test-utils";

import RequestStatus from "../RequestStatus";

describe("RequestStatus Component", () => {
  const contentPerStatus = {
    success: { title: "Success", description: "Request completed successfully" },
    error: { title: "Error", description: "An error occurred" },
    pending: { title: "Loading", description: "Please wait" },
  };

  test("pending 상태를 올바르게 렌더링한다", () => {
    render(<RequestStatus status="pending" contentPerStatus={contentPerStatus} />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
    expect(screen.getByText("Please wait")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("success 상태를 올바르게 렌더링한다", () => {
    render(<RequestStatus status="success" contentPerStatus={contentPerStatus} />);
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Request completed successfully")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument(); // 수정된 부분
  });

  test("error 상태를 올바르게 렌더링한다", () => {
    render(<RequestStatus status="error" contentPerStatus={contentPerStatus} />);
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("An error occurred")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument(); // 수정된 부분
  });

  test("상태 변경 시 UI가 올바르게 리렌더링된다", () => {
    const { rerender } = render(
      <RequestStatus status="pending" contentPerStatus={contentPerStatus} />,
    );
    expect(screen.getByText("Loading")).toBeInTheDocument();
    expect(screen.getByText("Please wait")).toBeInTheDocument();

    rerender(<RequestStatus status="success" contentPerStatus={contentPerStatus} />);
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Request completed successfully")).toBeInTheDocument();

    rerender(<RequestStatus status="error" contentPerStatus={contentPerStatus} />);
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });
});
