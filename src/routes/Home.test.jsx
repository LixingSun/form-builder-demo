import Home from "./Home";
import { render, screen } from '@testing-library/react';

describe("Home", () => {
  test("should render home page", () => {
    render(<Home />);
    const element = screen.getByText("Form Builder Demo");
    expect(element).toBeInTheDocument();
  });
});
