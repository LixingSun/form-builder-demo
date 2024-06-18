import { BrowserRouter } from 'react-router-dom';
import Preview from './Preview';
import { render, screen } from '@testing-library/react';
import { SchemaContext, INITIAL_SCHEMA } from '@/context/SchemaContext';
import { FIELD_TYPES } from '@/constants/fieldConstants';

const renderPreview = (schema) => {
  render(
    <BrowserRouter>
      <SchemaContext.Provider value={schema}>
        <Preview />
      </SchemaContext.Provider>
    </BrowserRouter>
  );
};

describe('Preview', () => {
  let mockSchema;
  const mockTextField = {
    id: 0,
    type: FIELD_TYPES.textField,
    title: 'Text Field Title',
    key: 'textFieldTitle',
    description: 'Text Field Description',
    required: true,
    maxLength: null,
  };

  test('should render preview page', () => {
    renderPreview(INITIAL_SCHEMA);

    const element = screen.getByText('Form Builder Demo');
    expect(element).toBeInTheDocument();
  });

  test('should render text field properly as per schema', () => {
    mockSchema = {
      ...INITIAL_SCHEMA,
      fields: [mockTextField],
    };

    renderPreview(mockSchema);

    const titleElements = screen.getAllByText(mockSchema.fields[0].title);
    expect(titleElements.length).not.toEqual(0);
  });
});
