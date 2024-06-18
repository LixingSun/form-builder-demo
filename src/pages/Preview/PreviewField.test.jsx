import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PreviewField from './PreviewField';
import { FIELD_TYPES } from '@/constants/fieldConstants';

const renderField = (field, setFormProps) => {
  const formProps = setFormProps ?? {
    touched: false,
    error: undefined,
    handleChange: () => {},
    handleBlur: () => {},
  };
  render(<PreviewField field={field} {...formProps} />);
};

describe('PreviewField', () => {
  const mockTextField = {
    id: 0,
    type: FIELD_TYPES.textField,
    title: 'Text Field Title',
    key: 'textFieldTitle',
    description: 'Text Field Description',
    required: true,
    maxLength: null,
  };

  const mockNumberField = {
    id: 1,
    type: FIELD_TYPES.number,
    title: 'Number Field Title',
    key: 'numberFieldTitle',
    description: 'Number Field Description',
    required: true,
    minValue: 0,
    maxValue: 100,
  };

  describe('PreviewTextField', () => {
    test('should show error when the field is touched and has error', () => {
      const mockError = 'some error to display';
      renderField(mockTextField, {
        touched: true,
        error: mockError,
        handleChange: () => {},
        handleBlur: () => {},
      });

      const errorMsg = screen.getByText(mockError);
      expect(errorMsg).toBeInTheDocument();
    });

    test('should not show error when the field is touched and has no error', () => {
      renderField(mockTextField, {
        touched: true,
        error: undefined,
        handleChange: () => {},
        handleBlur: () => {},
      });

      const errorMsg = screen
        .getByTestId(`field-${mockTextField.id}`)
        .querySelector(`#field-${mockTextField.id}-helper-text`);
      expect(errorMsg).toBeNull();
    });

    test('should not show error when the field is not touched', () => {
      const mockError = 'some error to display';

      renderField(mockTextField, {
        touched: false,
        error: mockError,
        handleChange: () => {},
        handleBlur: () => {},
      });

      const errorMsg = screen.queryByText(mockError);
      expect(errorMsg).toBeNull();
    });

    test('should trigger handleChange when the field is changed', () => {
      const mockHandleChange = vi.fn();

      renderField(mockTextField, {
        touched: true,
        error: undefined,
        handleChange: mockHandleChange,
        handleBlur: () => {},
      });

      const fieldInput = screen
        .getByTestId(`field-${mockTextField.id}`)
        .querySelector('input');
      fireEvent.change(fieldInput, { target: { value: 'new value' } });
      expect(mockHandleChange).toHaveBeenCalled();
    });

    test('should trigger handleBlur when the field is blurred', () => {
      const mockHandleBlur = vi.fn();

      renderField(mockTextField, {
        touched: true,
        error: undefined,
        handleChange: () => {},
        handleBlur: mockHandleBlur,
      });

      const fieldInput = screen
        .getByTestId(`field-${mockTextField.id}`)
        .querySelector('input');
      fireEvent.blur(fieldInput);
      expect(mockHandleBlur).toHaveBeenCalled();
    });
  });

  describe('PreviewNumberField', () => {
    test('should show error when the field is touched and has error', () => {
      const mockError = 'some error to display';
      renderField(mockNumberField, {
        touched: true,
        error: mockError,
        handleChange: () => {},
        handleBlur: () => {},
      });

      const errorMsg = screen.getByText(mockError);
      expect(errorMsg).toBeInTheDocument();
    });

    test('should not show error when the field is touched and has no error', () => {
      renderField(mockNumberField, {
        touched: true,
        error: undefined,
        handleChange: () => {},
        handleBlur: () => {},
      });

      const errorMsg = screen
        .getByTestId(`field-${mockNumberField.id}`)
        .querySelector(`#field-${mockNumberField.id}-helper-text`);
      expect(errorMsg).toBeNull();
    });

    test('should not show error when the field is not touched', () => {
      const mockError = 'some error to display';

      renderField(mockNumberField, {
        touched: false,
        error: mockError,
        handleChange: () => {},
        handleBlur: () => {},
      });

      const errorMsg = screen.queryByText(mockError);
      expect(errorMsg).toBeNull();
    });

    test('should trigger handleChange when the field is changed', () => {
      const mockHandleChange = vi.fn();

      renderField(mockNumberField, {
        touched: true,
        error: undefined,
        handleChange: mockHandleChange,
        handleBlur: () => {},
      });

      const fieldInput = screen
        .getByTestId(`field-${mockNumberField.id}`)
        .querySelector('input');
      fireEvent.change(fieldInput, { target: { value: 10 } });
      expect(mockHandleChange).toHaveBeenCalled();
    });

    test('should trigger handleBlur when the field is blurred', () => {
      const mockHandleBlur = vi.fn();

      renderField(mockNumberField, {
        touched: true,
        error: undefined,
        handleChange: () => {},
        handleBlur: mockHandleBlur,
      });

      const fieldInput = screen
        .getByTestId(`field-${mockNumberField.id}`)
        .querySelector('input');
      fireEvent.blur(fieldInput);
      expect(mockHandleBlur).toHaveBeenCalled();
    });
  });

  test('should throw error for unhandled field type', () => {
    expect(() => {
      renderField({
        type: 'unknown',
      });
    }).toThrowError();
  });
});
