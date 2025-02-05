import { render, RenderOptions } from "@testing-library/react";

function Provider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): ReturnType<typeof render> => render(ui, { wrapper: Provider, ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { customRender as render };
