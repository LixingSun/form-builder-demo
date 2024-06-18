import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PreviewForm from './PreviewForm';
import { FIELD_TYPES } from '@/constants/fieldConstants';

describe('PreviewForm', () => {
  let mockSchema;

  describe('Text Field', () => {
    const mockTextField = {
      id: 0,
      type: FIELD_TYPES.textField,
      title: 'Text Field Title',
      key: 'textFieldTitle',
      description: 'Text Field Description',
      required: true,
      maxLength: null,
    };

    test('should render text field title', () => {
      mockSchema = {
        fields: [mockTextField],
      };

      render(<PreviewForm schema={mockSchema} />);

      const titleElements = screen.getAllByText(mockSchema.fields[0].title);
      expect(titleElements.length).not.toEqual(0);
    });

    test('should show error when the field is required and no value is provided after touching', async () => {
      mockSchema = {
        fields: [mockTextField],
      };

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockTextField.id}`)
        .querySelector('input');
      fireEvent.blur(fieldInput);

      waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockTextField.id}`)
          .querySelector(`#field-${mockTextField.id}-helper-text`);
        expect(errorMsg).toBeInTheDocument();
      });
    });

    test('should show error when the field value exceeds maximum length', async () => {
      mockSchema = {
        fields: [{ ...mockTextField, maxLength: 3 }],
      };

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockTextField.id}`)
        .querySelector('input');
      fireEvent.change(fieldInput, { target: { value: 'over' } });
      fireEvent.blur(fieldInput);

      waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockTextField.id}`)
          .querySelector(`#field-${mockTextField.id}-helper-text`);
        expect(errorMsg).toBeInTheDocument();
      });
    });
  });

  test('should throw error for unhandled field type', () => {
    mockSchema = {
      fields: [{ type: 'unknown' }],
    };

    expect(() => {
      render(<PreviewForm schema={mockSchema} />);
    }).toThrowError();
  });
});
