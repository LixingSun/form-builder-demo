import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import {
  getFieldConfig,
  getFieldValidationSchema,
  getInitialValues,
} from './fieldConfig';
import { toCamelCase } from '@/utils/stringUtils';
import { useFormik } from 'formik';

const formatFormJson = (formJson) => {
  let formattedFormJson = structuredClone(formJson);

  const numericFieldKeys = ['maxLength', 'maxValue', 'minValue'];

  numericFieldKeys.forEach((numericFieldKey) => {
    if (
      numericFieldKey in formattedFormJson &&
      formattedFormJson[numericFieldKey] == ''
    ) {
      formattedFormJson[numericFieldKey] = null;
    }
  });

  return formattedFormJson;
};

export default function FieldDialog({
  open,
  fieldId,
  fieldType,
  fieldDisplayName,
  onClose,
  onSubmit,
  initialValues,
}) {
  const { handleSubmit, handleChange, handleBlur, errors, touched } = useFormik(
    {
      initialValues: getInitialValues(initialValues, fieldType),
      validationSchema: getFieldValidationSchema(fieldType),
      onSubmit: (values) => {
        const formattedValues = formatFormJson({
          id: fieldId,
          type: fieldType,
          key: toCamelCase(values.title),
          ...values,
        });
        onSubmit(formattedValues);
      },
    }
  );

  return (
    <Dialog
      data-testid="field-dialog"
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        noValidate: true,
        autoComplete: 'off',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>
        {!initialValues ? 'Create' : 'Edit'} Field - {fieldDisplayName}
      </DialogTitle>
      <DialogContent>
        {getFieldConfig(fieldType, {
          initialValues,
          handleChange,
          handleBlur,
          errors,
          touched,
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">{!initialValues ? 'Create' : 'Save'}</Button>
      </DialogActions>
    </Dialog>
  );
}

FieldDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  fieldId: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  fieldDisplayName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};
