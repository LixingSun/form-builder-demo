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
      isRequired: true,
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
        fields: [{ ...mockTextField, maxLength: '3' }],
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

  describe('Number Field', () => {
    const mockNumberField = {
      id: 0,
      type: FIELD_TYPES.number,
      title: 'Number Field Title',
      key: 'numberFieldTitle',
      description: 'Number Field Description',
      isRequired: true,
      minValue: null,
      maxValue: null,
    };

    test('should render number field title', () => {
      mockSchema = {
        fields: [mockNumberField],
      };

      render(<PreviewForm schema={mockSchema} />);

      const titleElements = screen.getAllByText(mockSchema.fields[0].title);
      expect(titleElements.length).not.toEqual(0);
    });

    test('should show error when the field is required and no value is provided after touching', async () => {
      mockSchema = {
        fields: [mockNumberField],
      };

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockNumberField.id}`)
        .querySelector('input');
      fireEvent.blur(fieldInput);

      waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockNumberField.id}`)
          .querySelector(`#field-${mockNumberField.id}-helper-text`);
        expect(errorMsg).toBeInTheDocument();
      });
    });

    test('should show error when the field value exceeds maximum value', async () => {
      mockSchema = {
        fields: [{ ...mockNumberField, maxValue: '10' }],
      };

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockNumberField.id}`)
        .querySelector('input');
      fireEvent.change(fieldInput, { target: { value: 20 } });
      fireEvent.blur(fieldInput);

      waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockNumberField.id}`)
          .querySelector(`#field-${mockNumberField.id}-helper-text`);
        expect(errorMsg).toBeInTheDocument();
      });
    });

    test('should show error when the field value is less then minimum value', async () => {
      mockSchema = {
        fields: [{ ...mockNumberField, minValue: 1 }],
      };

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockNumberField.id}`)
        .querySelector('input');
      fireEvent.change(fieldInput, { target: { value: 0 } });
      fireEvent.blur(fieldInput);

      waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockNumberField.id}`)
          .querySelector(`#field-${mockNumberField.id}-helper-text`);
        expect(errorMsg).toBeInTheDocument();
      });
    });
  });

  describe('Email Field', () => {
    const mockEmailField = {
      id: 0,
      type: FIELD_TYPES.email,
      title: 'Email Field Title',
      key: 'emailFieldTitle',
      description: 'Email Field Description',
      isRequired: true,
    };

    test('should render email field title', () => {
      mockSchema = {
        fields: [mockEmailField],
      };

      render(<PreviewForm schema={mockSchema} />);

      const titleElements = screen.getAllByText(mockSchema.fields[0].title);
      expect(titleElements.length).not.toEqual(0);
    });

    test('should show error when the field is required and no value is provided after touching', async () => {
      mockSchema = {
        fields: [mockEmailField],
      };

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockEmailField.id}`)
        .querySelector('input');
      fireEvent.blur(fieldInput);

      waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockEmailField.id}`)
          .querySelector(`#field-${mockEmailField.id}-helper-text`);
        expect(errorMsg).toBeInTheDocument();
      });
    });

    test('should show error when the field value is not a valid email', async () => {
      mockSchema = {
        fields: [mockEmailField],
      };

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockEmailField.id}`)
        .querySelector('input');
      fireEvent.change(fieldInput, { target: { value: 'invalidemail' } });
      fireEvent.blur(fieldInput);

      waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockEmailField.id}`)
          .querySelector(`#field-${mockEmailField.id}-helper-text`);
        expect(errorMsg).toBeInTheDocument();
      });
    });
  });

  describe('Dropdown Field', () => {
    const mockDropdownField = {
      id: 0,
      type: FIELD_TYPES.dropdown,
      title: 'Dropdown Field Title',
      key: 'dropdownFieldTitle',
      description: 'Dropdown Field Description',
      options: 'option1,option2,option3',
      isRequired: true,
    };

    test('should render dropdown field title', () => {
      mockSchema = {
        fields: [mockDropdownField],
      };

      render(<PreviewForm schema={mockSchema} />);

      const titleElements = screen.getAllByText(mockSchema.fields[0].title);
      expect(titleElements.length).not.toEqual(0);
    });

    test('should show error when the field is required and no option is selected after touching', async () => {
      mockSchema = {
        fields: [mockDropdownField],
      };

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockDropdownField.id}`)
        .querySelector('[role=combobox]');
      fireEvent.click(fieldInput);
      fireEvent.click(screen.getByTestId('preview-form'));

      waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockDropdownField.id}`)
          .querySelector(
            `#field-${mockDropdownField.id}-helper-text.Mui-Error`
          );
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
