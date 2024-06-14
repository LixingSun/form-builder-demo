import PreviewPage from './PreviewPage';
import { render, screen } from '@testing-library/react';

describe("PreviewPage", () => {
  test("should render preview page", () => {
    render(<PreviewPage />);
    const element = screen.getByText("Form Builder Demo");
    expect(element).toBeInTheDocument();
  });
});
