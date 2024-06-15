import EditorMenu from './EditorMenu';
import { render, screen } from '@testing-library/react';

describe('EditorMenu', () => {
  test('should render menu title', () => {
    render(<EditorMenu />);
    const element = screen.getByText('Create Field');
    expect(element).toBeInTheDocument();
  });
});
