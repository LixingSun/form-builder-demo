import EditorContent from './EditorContent';
import { render, screen } from '@testing-library/react';
import { initialSchema } from '@/context/SchemaContext';

const renderEditor = (schema = initialSchema) => {
  render(<EditorContent schema={schema} />);
};

describe('EditorContent', () => {
  test('should render form title', () => {
    renderEditor();
    const element = screen.getByText(initialSchema.title);
    expect(element).toBeInTheDocument();
  });

  test('should render every field for editing', () => {
    renderEditor();
    initialSchema.fields.forEach((field) => {
      const element = screen.getByText(field.title);
      expect(element).toBeInTheDocument();
    });
  });
});
