import { render, screen } from '@testing-library/react';
import { FIELD_TYPES } from '@/constants/fieldConstants';
import { getFieldConfig } from './fieldConfig';

describe('getFieldConfig', () => {
  test('should generate correct config fields for text field', () => {
    const ConfigFields = getFieldConfig(FIELD_TYPES.textField);
    render(ConfigFields);

    expect(screen.getByTestId('field-title-config')).toBeInTheDocument();
    expect(screen.getByTestId('field-description-config')).toBeInTheDocument();
    expect(screen.getByTestId('field-max-length-config')).toBeInTheDocument();
    expect(screen.getByTestId('field-required-config')).toBeInTheDocument();
  });

  test('should generate correct config fields for number field', () => {
    const ConfigFields = getFieldConfig(FIELD_TYPES.number);
    render(ConfigFields);

    expect(screen.getByTestId('field-title-config')).toBeInTheDocument();
    expect(screen.getByTestId('field-description-config')).toBeInTheDocument();
    expect(screen.getByTestId('field-max-value-config')).toBeInTheDocument();
    expect(screen.getByTestId('field-min-value-config')).toBeInTheDocument();
    expect(screen.getByTestId('field-required-config')).toBeInTheDocument();
  });

  test('should generate correct config fields for email field', () => {
    const ConfigFields = getFieldConfig(FIELD_TYPES.email);
    render(ConfigFields);

    expect(screen.getByTestId('field-title-config')).toBeInTheDocument();
    expect(screen.getByTestId('field-description-config')).toBeInTheDocument();
    expect(screen.getByTestId('field-required-config')).toBeInTheDocument();
  });
});
