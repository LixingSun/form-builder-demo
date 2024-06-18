import { render, screen } from '@testing-library/react';
import PreviewForm from './PreviewForm';
import { INITIAL_SCHEMA } from '@/context/SchemaContext';
import { FIELD_TYPES } from '@/constants/fieldConstants';

describe('PreviewForm', () => {
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

  test('should render text field properly as per schema', () => {
    mockSchema = {
      ...INITIAL_SCHEMA,
      fields: [mockTextField],
    };

    render(<PreviewForm schema={mockSchema} />);

    const titleElements = screen.getAllByText(mockSchema.fields[0].title);
    expect(titleElements.length).not.toEqual(0);
  });
});
