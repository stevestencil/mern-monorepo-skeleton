import { userEvent } from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import App from "../../App";

import { render, screen } from "./helpers";

describe("App Integration Tests", () => {
  it("should render the main app component", () => {
    render(<App />);

    // Check for Vite + React title
    expect(screen.getByText("Vite + React")).toBeInTheDocument();

    // Check for logos
    expect(screen.getByAltText("Vite logo")).toBeInTheDocument();
    expect(screen.getByAltText("React logo")).toBeInTheDocument();
  });

  it("should display the counter button", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /count is 0/i });
    expect(button).toBeInTheDocument();
  });

  it("should increment counter when button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole("button", { name: /count is 0/i });

    // Click the button
    await user.click(button);

    // Counter should increment
    expect(
      screen.getByRole("button", { name: /count is 1/i }),
    ).toBeInTheDocument();
  });

  it("should increment counter multiple times", async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole("button", { name: /count is 0/i });

    // Click multiple times
    await user.click(button);
    await user.click(button);
    await user.click(button);

    // Counter should be 3
    expect(
      screen.getByRole("button", { name: /count is 3/i }),
    ).toBeInTheDocument();
  });

  it("should display the edit instruction", () => {
    render(<App />);

    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/src\/App\.tsx/i)).toBeInTheDocument();
    expect(screen.getByText(/save to test HMR/i)).toBeInTheDocument();
  });

  it("should display the read the docs text", () => {
    render(<App />);

    expect(
      screen.getByText(/click on the vite and react logos to learn more/i),
    ).toBeInTheDocument();
  });

  it("should have clickable logo links", () => {
    render(<App />);

    const viteLink = screen.getByRole("link", { name: /vite logo/i });
    const reactLink = screen.getByRole("link", { name: /react logo/i });

    expect(viteLink).toHaveAttribute("href", "https://vite.dev");
    expect(reactLink).toHaveAttribute("href", "https://react.dev");
  });
});
