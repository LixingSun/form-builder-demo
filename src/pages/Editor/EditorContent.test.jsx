import EditorContent from './EditorContent';
import { render, screen } from '@testing-library/react';
import { INITIAL_SCHEMA } from '@/context/SchemaContext';

const renderEditor = (schema = INITIAL_SCHEMA) => {
  render(<EditorContent schema={schema} />);
};

describe('EditorContent', () => {
  test('should render form title', () => {
    renderEditor();
    const element = screen.getByText(INITIAL_SCHEMA.title);
    expect(element).toBeInTheDocument();
  });

  test('should render every field for editing', () => {
    renderEditor();
    INITIAL_SCHEMA.fields.forEach((field) => {
      const element = screen.getByText(field.title);
      expect(element).toBeInTheDocument();
    });
  });
});
