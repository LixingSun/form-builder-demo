import Home from "./Home";
import { render, screen } from '@testing-library/react';

describe("Home", () => {
  test("should render home page", () => {
    render(<Home />);
    const element = screen.getByText("Home");
    expect(element).toBeInTheDocument();
  });
});
