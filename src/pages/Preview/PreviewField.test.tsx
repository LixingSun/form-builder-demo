import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PreviewField, { IPreviewFieldProps } from './PreviewField';
import { FIELD_TYPES } from '@/constants/fieldConstants';
import { IField } from '@/context/SchemaContext';
import { ChangeEvent, FocusEventHandler } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { FormikTouched, FormikValues } from 'formik';

interface IFormProps {
  touched: boolean;
  error?: string;
  handleChange(e: ChangeEvent | SelectChangeEvent): void;
  handleBlur: FocusEventHandler;
  setTouched(touched: FormikTouched<FormikValues>): any;
}
const renderField = (field: IField, setFormProps: IFormProps) => {
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
    id: '0',
    type: FIELD_TYPES.TEXT_FIELD,
    title: 'Text Field Title',
    key: 'textFieldTitle',
    description: 'Text Field Description',
    isRequired: true,
    maxLength: null,
  };

  const mockNumberField = {
    id: '1',
    type: FIELD_TYPES.NUMBER,
    title: 'Number Field Title',
    key: 'numberFieldTitle',
    description: 'Number Field Description',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
  };

  const mockEmailField = {
    id: '2',
    type: FIELD_TYPES.EMAIL,
    title: 'Email Field Title',
    key: 'emailFieldTitle',
    description: 'Email Field Description',
    isRequired: true,
  };

  describe('PreviewTextField', () => {
    test('should show error when the field is touched and has error', () => {
      const mockError = 'some error to display';
      renderField(mockTextField, {
        touched: true,
        error: mockError,
        handleChange: () => {},
        handleBlur: () => {},
        setTouched: () => {},
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
        setTouched: () => {},
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
        setTouched: () => {},
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
        setTouched: () => {},
      });

      const fieldInput = screen
        .getByTestId(`field-${mockTextField.id}`)
        .querySelector('input');
      expect(fieldInput).not.toBeNull();
      fireEvent.change(fieldInput!, { target: { value: 'new value' } });
      expect(mockHandleChange).toHaveBeenCalled();
    });

    test('should trigger handleBlur when the field is blurred', () => {
      const mockHandleBlur = vi.fn();

      renderField(mockTextField, {
        touched: true,
        error: undefined,
        handleChange: () => {},
        handleBlur: mockHandleBlur,
        setTouched: () => {},
      });

      const fieldInput = screen
        .getByTestId(`field-${mockTextField.id}`)
        .querySelector('input');
      expect(fieldInput).not.toBeNull();
      fireEvent.blur(fieldInput!);
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
        setTouched: () => {},
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
        setTouched: () => {},
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
        setTouched: () => {},
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
        setTouched: () => {},
      });

      const fieldInput = screen
        .getByTestId(`field-${mockNumberField.id}`)
        .querySelector('input');
      expect(fieldInput).not.toBeNull();
      fireEvent.change(fieldInput!, { target: { value: 10 } });
      expect(mockHandleChange).toHaveBeenCalled();
    });

    test('should trigger handleBlur when the field is blurred', () => {
      const mockHandleBlur = vi.fn();

      renderField(mockNumberField, {
        touched: true,
        error: undefined,
        handleChange: () => {},
        handleBlur: mockHandleBlur,
        setTouched: () => {},
      });

      const fieldInput = screen
        .getByTestId(`field-${mockNumberField.id}`)
        .querySelector('input');
      expect(fieldInput).not.toBeNull();
      fireEvent.blur(fieldInput!);
      expect(mockHandleBlur).toHaveBeenCalled();
    });
  });

  describe('PreviewEmailField', () => {
    test('should show error when the field is touched and has error', () => {
      const mockError = 'some error to display';
      renderField(mockEmailField, {
        touched: true,
        error: mockError,
        handleChange: () => {},
        handleBlur: () => {},
        setTouched: () => {},
      });

      const errorMsg = screen.getByText(mockError);
      expect(errorMsg).toBeInTheDocument();
    });

    test('should not show error when the field is touched and has no error', () => {
      renderField(mockEmailField, {
        touched: true,
        error: undefined,
        handleChange: () => {},
        handleBlur: () => {},
        setTouched: () => {},
      });

      const errorMsg = screen
        .getByTestId(`field-${mockEmailField.id}`)
        .querySelector(`#field-${mockEmailField.id}-helper-text`);
      expect(errorMsg).toBeNull();
    });

    test('should not show error when the field is not touched', () => {
      const mockError = 'some error to display';

      renderField(mockEmailField, {
        touched: false,
        error: mockError,
        handleChange: () => {},
        handleBlur: () => {},
        setTouched: () => {},
      });

      const errorMsg = screen.queryByText(mockError);
      expect(errorMsg).toBeNull();
    });

    test('should trigger handleChange when the field is changed', () => {
      const mockHandleChange = vi.fn();

      renderField(mockEmailField, {
        touched: true,
        error: undefined,
        handleChange: mockHandleChange,
        handleBlur: () => {},
        setTouched: () => {},
      });

      const fieldInput = screen
        .getByTestId(`field-${mockEmailField.id}`)
        .querySelector('input');
      expect(fieldInput).not.toBeNull();
      fireEvent.change(fieldInput!, { target: { value: 10 } });
      expect(mockHandleChange).toHaveBeenCalled();
    });

    test('should trigger handleBlur when the field is blurred', () => {
      const mockHandleBlur = vi.fn();

      renderField(mockEmailField, {
        touched: true,
        error: undefined,
        handleChange: () => {},
        handleBlur: mockHandleBlur,
        setTouched: () => {},
      });

      const fieldInput = screen
        .getByTestId(`field-${mockEmailField.id}`)
        .querySelector('input');
      expect(fieldInput).not.toBeNull();
      fireEvent.blur(fieldInput!);
      expect(mockHandleBlur).toHaveBeenCalled();
    });
  });
});
