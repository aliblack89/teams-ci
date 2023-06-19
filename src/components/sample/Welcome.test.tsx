import { render, screen } from "../../test-utils";
import { Welcome } from "./Welcome";

test("should render", async () => {
  render(<Welcome />);
  const el = screen.getByRole("img");

  expect(el).toBeInTheDocument();
});

it("should increment count", async () => {
  const { user } = render(<Welcome />);

  const count = screen.getByTestId("count");
  const btn = screen.getByTestId("btn");

  expect(count).toHaveTextContent("0");

  await user.click(btn);

  expect(count).toHaveTextContent("1");
});
