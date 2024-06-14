import Preview from './Preview';
import { render, screen } from '@testing-library/react';

describe("Preview", () => {
  test("should render preview page", () => {
    render(<Preview />);
    const element = screen.getByText("Preview");
    expect(element).toBeInTheDocument();
  });
});
