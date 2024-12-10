import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from "./App";
test("renders logo", () => {
  render(<App />);
  const logo = screen.getByTestId("logo");
  expect(logo).toBeInTheDocument();
});

test("renders sign up", () => {
  render(<App />);
  const signUp = screen.getByTestId("sign-up");
  expect(signUp).toBeInTheDocument();
});

test("renders forgot password", () => {
  render(<App />);
  const forgotPassword = screen.getByTestId("forgot-password");
  expect(forgotPassword).toBeInTheDocument();
});