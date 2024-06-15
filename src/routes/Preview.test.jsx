import Preview from './Preview';
import { render, screen } from '@testing-library/react';

describe('Preview', () => {
  test('should render preview page', () => {
    render(<Preview />);
    const element = screen.getByText('Form Builder Demo');
    expect(element).toBeInTheDocument();
  });
});
