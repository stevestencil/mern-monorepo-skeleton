import { render } from "@testing-library/react";

import type { RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return children;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };
