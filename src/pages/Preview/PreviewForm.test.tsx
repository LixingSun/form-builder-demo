import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PreviewForm from './PreviewForm';
import { FIELD_TYPES } from '@/constants/fieldConstants';
import { expect } from 'vitest';
import { IField, IFormSchema } from '@/context/SchemaContext';

const initSchema = (fields: IField[]): IFormSchema => {
  return {
    title: 'title',
    description: 'description',
    fields,
  };
};

describe('PreviewForm', () => {
  let mockSchema: IFormSchema;

  describe('Text Field', () => {
    const mockTextField: IField = {
      id: '0',
      type: FIELD_TYPES.TEXT_FIELD,
      title: 'Text Field Title',
      key: 'textFieldTitle',
      description: 'Text Field Description',
      isRequired: true,
      maxLength: null,
    };

    test('should render text field title', () => {
      mockSchema = initSchema([mockTextField]);

      render(<PreviewForm schema={mockSchema} />);

      const titleElements = screen.getAllByText(mockSchema.fields[0].title);
      expect(titleElements.length).not.toEqual(0);
    });

    test('should show error when the field is required and no value is provided after touching', async () => {
      mockSchema = initSchema([mockTextField]);

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockTextField.id}`)
        .querySelector('input');
      expect(fieldInput).not.toBeNull();
      fireEvent.blur(fieldInput!);

      await waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockTextField.id}`)
          .querySelector(`#field-${mockTextField.id}-helper-text`);
        expect(errorMsg).toBeInTheDocument();
      });
    });

    test('should show error when the field value exceeds maximum length', async () => {
      mockSchema = initSchema([{ ...mockTextField, maxLength: 3 }]);

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockTextField.id}`)
        .querySelector('input');
      expect(fieldInput).not.toBeNull();
      fireEvent.change(fieldInput!, { target: { value: 'over' } });
      fireEvent.blur(fieldInput!);

      await waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockTextField.id}`)
          .querySelector(`#field-${mockTextField.id}-helper-text`);
        expect(errorMsg).toBeInTheDocument();
      });
    });
  });

  describe('Number Field', () => {
    const mockNumberField: IField = {
      id: '0',
      type: FIELD_TYPES.NUMBER,
      title: 'Number Field Title',
      key: 'numberFieldTitle',
      description: 'Number Field Description',
      isRequired: true,
      minValue: null,
      maxValue: null,
    };

    test('should render number field title', () => {
      mockSchema = initSchema([mockNumberField]);

      render(<PreviewForm schema={mockSchema} />);

      const titleElements = screen.getAllByText(mockSchema.fields[0].title);
      expect(titleElements.length).not.toEqual(0);
    });

    test('should show error when the field is required and no value is provided after touching', async () => {
      mockSchema = initSchema([mockNumberField]);

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockNumberField.id}`)
        .querySelector('input');
      expect(fieldInput).not.toBeNull();
      fireEvent.blur(fieldInput!);

      await waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockNumberField.id}`)
          .querySelector(`#field-${mockNumberField.id}-helper-text`);
        expect(errorMsg).toBeInTheDocument();
      });
    });

    test('should show error when the field value exceeds maximum value', async () => {
      mockSchema = initSchema([{ ...mockNumberField, maxValue: 10 }]);

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockNumberField.id}`)
        .querySelector('input');
      expect(fieldInput).not.toBeNull();
      fireEvent.change(fieldInput!, { target: { value: 20 } });
      fireEvent.blur(fieldInput!);

      await waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockNumberField.id}`)
          .querySelector(`#field-${mockNumberField.id}-helper-text`);
        expect(errorMsg).toBeInTheDocument();
      });
    });

    test('should show error when the field value is less then minimum value', async () => {
      mockSchema = initSchema([{ ...mockNumberField, minValue: 1 }]);

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockNumberField.id}`)
        .querySelector('input');
      expect(fieldInput).not.toBeNull();
      fireEvent.change(fieldInput!, { target: { value: 0 } });
      fireEvent.blur(fieldInput!);

      await waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockNumberField.id}`)
          .querySelector(`#field-${mockNumberField.id}-helper-text`);
        expect(errorMsg).toBeInTheDocument();
      });
    });
  });

  describe('Email Field', () => {
    const mockEmailField = {
      id: '0',
      type: FIELD_TYPES.EMAIL,
      title: 'Email Field Title',
      key: 'emailFieldTitle',
      description: 'Email Field Description',
      isRequired: true,
    };

    test('should render email field title', () => {
      mockSchema = initSchema([mockEmailField]);

      render(<PreviewForm schema={mockSchema} />);

      const titleElements = screen.getAllByText(mockSchema.fields[0].title);
      expect(titleElements.length).not.toEqual(0);
    });

    test('should show error when the field is required and no value is provided after touching', async () => {
      mockSchema = initSchema([mockEmailField]);

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockEmailField.id}`)
        .querySelector('input');
      expect(fieldInput).not.toBeNull();
      fireEvent.blur(fieldInput!);

      await waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockEmailField.id}`)
          .querySelector(`#field-${mockEmailField.id}-helper-text`);
        expect(errorMsg).toBeInTheDocument();
      });
    });

    test('should show error when the field value is not a valid email', async () => {
      mockSchema = initSchema([mockEmailField]);

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockEmailField.id}`)
        .querySelector('input');
      expect(fieldInput).not.toBeNull();
      fireEvent.change(fieldInput!, { target: { value: 'invalidemail' } });
      fireEvent.blur(fieldInput!);

      await waitFor(() => {
        const errorMsg = screen
          .getByTestId(`field-${mockEmailField.id}`)
          .querySelector(`#field-${mockEmailField.id}-helper-text`);
        expect(errorMsg).toBeInTheDocument();
      });
    });
  });

  describe('Dropdown Field', () => {
    const mockDropdownField = {
      id: '0',
      type: FIELD_TYPES.DROPDOWN,
      title: 'Dropdown Field Title',
      key: 'dropdownFieldTitle',
      description: 'Dropdown Field Description',
      options: 'option1,option2,option3',
      isRequired: true,
    };

    test('should render dropdown field title', () => {
      mockSchema = initSchema([mockDropdownField]);

      render(<PreviewForm schema={mockSchema} />);

      const titleElements = screen.getAllByText(mockSchema.fields[0].title);
      expect(titleElements.length).not.toEqual(0);
    });

    test('should show error when the field is required and no option is selected after touching', async () => {
      mockSchema = initSchema([mockDropdownField]);

      render(<PreviewForm schema={mockSchema} />);

      const fieldInput = screen
        .getByTestId(`field-${mockDropdownField.id}`)
        .querySelector('[role=combobox]');
      expect(fieldInput).not.toBeNull();
      fireEvent.mouseDown(fieldInput!);

      const modalBackdrop = screen
        .getByRole('presentation')
        .querySelector('.MuiModal-backdrop');
      expect(modalBackdrop).not.toBeNull();
      fireEvent.click(modalBackdrop!);

      await waitFor(() => {
        const helperText = screen.getByTestId(
          `field-${mockDropdownField.id}-helper-text`
        );

        expect(helperText).toHaveClass('Mui-error');
      });
    });
  });
});
