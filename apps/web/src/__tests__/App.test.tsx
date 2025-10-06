import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import App from "../App";

describe("App", () => {
  it("should render the app with initial state", () => {
    render(<App />);

    expect(screen.getByText("Vite + React")).toBeInTheDocument();
    expect(screen.getByText("count is 0")).toBeInTheDocument();
    expect(
      screen.getByText((_content, element) => {
        return element?.textContent === "Edit src/App.tsx and save to test HMR";
      }),
    ).toBeInTheDocument();
  });

  it("should increment counter when button is clicked", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /count is 0/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("count is 1")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("count is 2")).toBeInTheDocument();
  });

  it("should display Vite and React logos", () => {
    render(<App />);

    const viteLogo = screen.getByAltText("Vite logo");
    const reactLogo = screen.getByAltText("React logo");

    expect(viteLogo).toBeInTheDocument();
    expect(reactLogo).toBeInTheDocument();
  });

  it("should have correct links to external resources", () => {
    render(<App />);

    const viteLink = screen.getByRole("link", { name: /vite logo/i });
    const reactLink = screen.getByRole("link", { name: /react logo/i });

    expect(viteLink).toHaveAttribute("href", "https://vite.dev");
    expect(viteLink).toHaveAttribute("target", "_blank");

    expect(reactLink).toHaveAttribute("href", "https://react.dev");
    expect(reactLink).toHaveAttribute("target", "_blank");
  });

  it("should display instructional text", () => {
    render(<App />);

    expect(
      screen.getByText(/Click on the Vite and React logos to learn more/i),
    ).toBeInTheDocument();
  });
});
