import { render, screen } from "@testing-library/react";
import { Welcome } from "./Welcome";

test("should render", async () => {
  render(<Welcome />);
  const el = screen.getByRole("img");

  expect(el).toBeInTheDocument();
});
