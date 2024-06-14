import HomePage from "./HomePage";
import { render, screen } from '@testing-library/react';

describe("HomePage", () => {
  test("should render home page", () => {
    render(<HomePage />);
    const element = screen.getByText("Form Builder Demo");
    expect(element).toBeInTheDocument();
  });
});
