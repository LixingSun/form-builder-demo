import Editor from './Editor';
import { render, screen } from '@testing-library/react';

describe('Editor', () => {
  test('should render editor page', () => {
    render(<Editor />);
    const element = screen.getByText('Form Builder Demo');
    expect(element).toBeInTheDocument();
  });
});
