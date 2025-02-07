// tests/App.test.tsx
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import React from "react";

test("renders welcome message", () => {
  render(<App />);
  const heading = screen.getByText(/Hello, vanilla‑extract!/i);
  expect(heading).toBeInTheDocument();
});
