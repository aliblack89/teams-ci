import { ReactElement } from "react";
import { render as _render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export * from "@testing-library/react";

export const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return {
    ..._render(ui, { ...options }),
    user: userEvent.setup(),
  };
};
