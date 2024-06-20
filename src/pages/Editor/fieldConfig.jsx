import { TextField, FormControlLabel, Switch } from '@mui/material';
import { FIELD_TYPES } from '@/constants/fieldConstants';
import PropTypes from 'prop-types';
import * as yup from 'yup';

function TitleConfig({
  defaultValue,
  touched,
  error,
  handleChange,
  handleBlur,
}) {
  return (
    <TextField
      required
      margin="dense"
      id="field-title-config"
      data-testid="field-title-config"
      name="title"
      label="Field Title"
      fullWidth
      variant="standard"
      defaultValue={defaultValue}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched && Boolean(error)}
      helperText={touched && error}
    />
  );
}
TitleConfig.propTypes = {
  defaultValue: PropTypes.string,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

function DescriptionConfig({
  defaultValue,
  touched,
  error,
  handleChange,
  handleBlur,
}) {
  return (
    <TextField
      margin="dense"
      id="field-description-config"
      data-testid="field-description-config"
      name="description"
      label="Field Description"
      fullWidth
      variant="standard"
      defaultValue={defaultValue}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched && Boolean(error)}
      helperText={touched && error}
    />
  );
}
DescriptionConfig.propTypes = {
  defaultValue: PropTypes.string,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

function MaxLengthConfig({
  defaultValue,
  touched,
  error,
  handleChange,
  handleBlur,
}) {
  return (
    <TextField
      margin="dense"
      id="field-max-length-config"
      data-testid="field-max-length-config"
      name="maxLength"
      label="Maximum Length"
      type="number"
      fullWidth
      variant="standard"
      defaultValue={defaultValue}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched && Boolean(error)}
      helperText={touched && error}
    />
  );
}
MaxLengthConfig.propTypes = {
  defaultValue: PropTypes.number,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

function MaxValueConfig({
  defaultValue,
  touched,
  error,
  handleChange,
  handleBlur,
}) {
  return (
    <TextField
      margin="dense"
      id="field-max-value-config"
      data-testid="field-max-value-config"
      name="maxValue"
      label="Maximum Value"
      type="number"
      fullWidth
      variant="standard"
      defaultValue={defaultValue}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched && Boolean(error)}
      helperText={touched && error}
    />
  );
}
MaxValueConfig.propTypes = {
  defaultValue: PropTypes.number,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

function MinValueConfig({
  defaultValue,
  touched,
  error,
  handleChange,
  handleBlur,
}) {
  return (
    <TextField
      margin="dense"
      id="field-min-value-config"
      data-testid="field-min-value-config"
      name="minValue"
      label="Minimum Value"
      type="number"
      fullWidth
      variant="standard"
      defaultValue={defaultValue}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched && Boolean(error)}
      helperText={touched && error}
    />
  );
}
MinValueConfig.propTypes = {
  defaultValue: PropTypes.number,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

function OptionsConfig({
  defaultValue,
  touched,
  error,
  handleChange,
  handleBlur,
}) {
  return (
    <TextField
      required
      margin="dense"
      id="field-options-config"
      data-testid="field-options-config"
      name="options"
      label="Options"
      fullWidth
      variant="standard"
      defaultValue={defaultValue}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched && Boolean(error)}
      helperText={
        touched && error
          ? error
          : 'Enter options separated by commas (e.g. option1,option2,option3).'
      }
    />
  );
}
OptionsConfig.propTypes = {
  defaultValue: PropTypes.string,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

function RequiredConfig({ defaultValue, handleChange }) {
  return (
    <FormControlLabel
      name="isRequired"
      id="field-required-config"
      data-testid="field-required-config"
      control={<Switch defaultChecked={defaultValue} onChange={handleChange} />}
      label="Required"
      sx={{ marginTop: 2, marginBottom: 1 }}
    />
  );
}
RequiredConfig.propTypes = {
  defaultValue: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

export const getFieldConfig = (
  fieldType,
  { initialValues, handleChange, handleBlur, errors, touched }
) => {
  const getConfigProps = (attr) => {
    return {
      defaultValue: initialValues ? initialValues[attr] : undefined,
      handleChange,
      handleBlur,
      error: errors[attr],
      touched: !!touched[attr],
    };
  };

  switch (fieldType) {
    case FIELD_TYPES.textField:
      return (
        <>
          <TitleConfig {...getConfigProps('title')} />
          <DescriptionConfig {...getConfigProps('description')} />
          <MaxLengthConfig {...getConfigProps('maxLength')} />
          <RequiredConfig {...getConfigProps('isRequired')} />
        </>
      );
    case FIELD_TYPES.number:
      return (
        <>
          <TitleConfig {...getConfigProps('title')} />
          <DescriptionConfig {...getConfigProps('description')} />
          <MinValueConfig {...getConfigProps('minValue')} />
          <MaxValueConfig {...getConfigProps('maxValue')} />
          <RequiredConfig {...getConfigProps('isRequired')} />
        </>
      );
    case FIELD_TYPES.email:
      return (
        <>
          <TitleConfig {...getConfigProps('title')} />
          <DescriptionConfig {...getConfigProps('description')} />
          <RequiredConfig {...getConfigProps('isRequired')} />
        </>
      );
    case FIELD_TYPES.dropdown:
      return (
        <>
          <TitleConfig {...getConfigProps('title')} />
          <DescriptionConfig {...getConfigProps('description')} />
          <OptionsConfig {...getConfigProps('options')} />
          <RequiredConfig {...getConfigProps('isRequired')} />
        </>
      );
  }
};

export const getFieldValidationSchema = (fieldType) => {
  let validators = {};

  switch (fieldType) {
    case FIELD_TYPES.textField:
      validators = {
        title: yup.string().required('This field is required.'),
      };
      break;
    case FIELD_TYPES.number:
      validators = {
        title: yup.string().required('This field is required.'),
      };
      break;
    case FIELD_TYPES.email:
      validators = {
        title: yup.string().required('This field is required.'),
      };
      break;
    case FIELD_TYPES.dropdown:
      validators = {
        title: yup.string().required('This field is required.'),
        options: yup.string().required('This field is required.'),
      };
      break;
  }

  return yup.object(validators);
};

export const getInitialValues = (initialValues, fieldType) => {
  if (initialValues) return initialValues;
  switch (fieldType) {
    case FIELD_TYPES.textField:
      return { title: '', description: '', maxLength: null, isRequired: false };
    case FIELD_TYPES.number:
      return {
        title: '',
        description: '',
        minValue: null,
        maxValue: null,
        isRequired: false,
      };
    case FIELD_TYPES.email:
      return { title: '', description: '', isRequired: false };
    case FIELD_TYPES.dropdown:
      return { title: '', description: '', options: '', isRequired: false };
  }
};
