import Editor from './Editor';
import { render, screen } from '@testing-library/react';
import { SchemaContext, initialSchema } from '@/context/SchemaContext';

const renderWithContext = (schema = initialSchema) => {
  render(
    <SchemaContext.Provider value={schema}>
      <Editor />
    </SchemaContext.Provider>
  );
};

describe('Editor', () => {
  test('should render editor page', () => {
    renderWithContext();
    const element = screen.getByText('Form Builder Demo');
    expect(element).toBeInTheDocument();
  });
});
