import { render, screen } from '@testing-library/react';
import { SchemaProvider } from './SchemaContext';

describe('SchemaContext', () => {
  describe('SchemaProvider', () => {
    test('should render children', () => {
      const text = 'Test';
      render(
        <SchemaProvider>
          <div>{text}</div>
        </SchemaProvider>
      );
      const element = screen.getByText(text);
      expect(element).toBeInTheDocument();
    });
  });
});
