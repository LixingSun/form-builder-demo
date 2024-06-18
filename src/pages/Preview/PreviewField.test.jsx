import { render } from '@testing-library/react';
import PreviewField from './PreviewField';
import { Formik } from 'formik';

const renderField = (field) => {
  render(
    <Formik>
      <PreviewField field={field} />
    </Formik>
  );
};

describe('PreviewField', () => {
  describe('PreviewTextField', () => {
    test('should show error when no value is provided, given the field is required', () => {});

    test('should not show error when no value is provided, given the field is not required', () => {});

    test('should show error when the value given exceeds the maximum nummber', () => {});
  });

  test('should throw error for unhandled field type', () => {
    expect(() => {
      renderField({
        type: 'unknown',
      });
    }).toThrowError();
  });
});
