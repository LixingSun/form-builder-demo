import { render, screen } from '@testing-library/react';
import { FIELD_TYPES } from '@/constants/fieldConstants';
import {
  DROPDOWN_INITIAL_VALUES,
  EMAIL_INITIAL_VALUES,
  NUMBER_INITIAL_VALUES,
  TEXT_FIELD_INITIAL_VALUES,
  getFieldConfig,
  getFieldValidationSchema,
  getInitialValues,
} from './fieldConfig';

describe('fieldConfig', () => {
  describe('getFieldConfig', () => {
    const mockProps = {
      initialValues: null,
      handleChange: () => {},
      handleBlur: () => {},
      errors: {},
      touched: {},
    };

    test('should generate correct config fields for text field', () => {
      const ConfigFields = getFieldConfig(FIELD_TYPES.TEXT_FIELD, mockProps);
      render(ConfigFields);

      expect(screen.getByTestId('field-title-config')).toBeInTheDocument();
      expect(
        screen.getByTestId('field-description-config')
      ).toBeInTheDocument();
      expect(screen.getByTestId('field-max-length-config')).toBeInTheDocument();
      expect(screen.getByTestId('field-required-config')).toBeInTheDocument();
    });

    test('should generate correct config fields for number field', () => {
      const ConfigFields = getFieldConfig(FIELD_TYPES.NUMBER, mockProps);
      render(ConfigFields);

      expect(screen.getByTestId('field-title-config')).toBeInTheDocument();
      expect(
        screen.getByTestId('field-description-config')
      ).toBeInTheDocument();
      expect(screen.getByTestId('field-max-value-config')).toBeInTheDocument();
      expect(screen.getByTestId('field-min-value-config')).toBeInTheDocument();
      expect(screen.getByTestId('field-required-config')).toBeInTheDocument();
    });

    test('should generate correct config fields for email field', () => {
      const ConfigFields = getFieldConfig(FIELD_TYPES.EMAIL, mockProps);
      render(ConfigFields);

      expect(screen.getByTestId('field-title-config')).toBeInTheDocument();
      expect(
        screen.getByTestId('field-description-config')
      ).toBeInTheDocument();
      expect(screen.getByTestId('field-required-config')).toBeInTheDocument();
    });

    test('should generate correct config fields for dropdown field', () => {
      const ConfigFields = getFieldConfig(FIELD_TYPES.DROPDOWN, mockProps);
      render(ConfigFields);

      expect(screen.getByTestId('field-title-config')).toBeInTheDocument();
      expect(
        screen.getByTestId('field-description-config')
      ).toBeInTheDocument();
      expect(screen.getByTestId('field-options-config')).toBeInTheDocument();
      expect(screen.getByTestId('field-required-config')).toBeInTheDocument();
    });
  });

  describe('getFieldValidationSchema', () => {
    let validationSchema;

    test('should create validators for text field', () => {
      validationSchema = getFieldValidationSchema(FIELD_TYPES.TEXT_FIELD);
      expect(Object.keys(validationSchema.fields)).toContain('title');
    });

    test('should create validators for number field', () => {
      validationSchema = getFieldValidationSchema(FIELD_TYPES.NUMBER);
      expect(Object.keys(validationSchema.fields)).toContain('title');
    });

    test('should create validators for email field', () => {
      validationSchema = getFieldValidationSchema(FIELD_TYPES.EMAIL);
      expect(Object.keys(validationSchema.fields)).toContain('title');
    });

    test('should create validators for dropdown field', () => {
      validationSchema = getFieldValidationSchema(FIELD_TYPES.DROPDOWN);
      expect(Object.keys(validationSchema.fields)).toContain('title');
      expect(Object.keys(validationSchema.fields)).toContain('options');
    });
  });

  describe('getInitialValues', () => {
    test('should forward initial values if values are given', () => {
      const mockField = {
        title: '',
        description: '',
        maxLength: null,
        isRequired: false,
      };
      const initialValues = getInitialValues(FIELD_TYPES.TEXT_FIELD, mockField);
      expect(initialValues).toEqual(mockField);
    });

    test('should provide initial values for text field', () => {
      const initialValues = getInitialValues(FIELD_TYPES.TEXT_FIELD);
      expect(initialValues).toEqual(TEXT_FIELD_INITIAL_VALUES);
    });

    test('should provide initial values for number field', () => {
      const initialValues = getInitialValues(FIELD_TYPES.NUMBER);
      expect(initialValues).toEqual(NUMBER_INITIAL_VALUES);
    });

    test('should provide initial values for email field', () => {
      const initialValues = getInitialValues(FIELD_TYPES.EMAIL);
      expect(initialValues).toEqual(EMAIL_INITIAL_VALUES);
    });

    test('should provide initial values for dropdown field', () => {
      const initialValues = getInitialValues(FIELD_TYPES.DROPDOWN);
      expect(initialValues).toEqual(DROPDOWN_INITIAL_VALUES);
    });
  });
});
