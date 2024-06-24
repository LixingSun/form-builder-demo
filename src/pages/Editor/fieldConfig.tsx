import { ChangeEvent, FocusEvent } from 'react';
import * as yup from 'yup';
import { TextField, FormControlLabel, Switch } from '@mui/material';
import { FIELD_TYPES } from '@/constants/fieldConstants';
import { IFieldBase } from '@/context/SchemaContext';
import { FormikErrors, FormikTouched } from 'formik';
import { ERROR_MESSAGE_REQUIRED } from "@/constants/validationConstants";

interface IConfigProps {
  defaultValue?: string | number | boolean | null;
  touched?: boolean;
  error?: string;
  handleChange(e: ChangeEvent): void;
  handleBlur?(e: FocusEvent): void;
}

const TitleConfig: React.FC<IConfigProps> = ({
  defaultValue,
  touched,
  error,
  handleChange,
  handleBlur,
}) => {
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
};

const DescriptionConfig: React.FC<IConfigProps> = ({
  defaultValue,
  touched,
  error,
  handleChange,
  handleBlur,
}) => {
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
};

const MaxLengthConfig: React.FC<IConfigProps> = ({
  defaultValue,
  touched,
  error,
  handleChange,
  handleBlur,
}) => {
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
};

const MaxValueConfig: React.FC<IConfigProps> = ({
  defaultValue,
  touched,
  error,
  handleChange,
  handleBlur,
}) => {
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
};

const MinValueConfig: React.FC<IConfigProps> = ({
  defaultValue,
  touched,
  error,
  handleChange,
  handleBlur,
}) => {
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
};

const OptionsConfig: React.FC<IConfigProps> = ({
  defaultValue,
  touched,
  error,
  handleChange,
  handleBlur,
}) => {
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
};

const RequiredConfig: React.FC<IConfigProps> = ({
  defaultValue,
  handleChange,
}) => {
  return (
    <FormControlLabel
      name="isRequired"
      id="field-required-config"
      data-testid="field-required-config"
      control={
        <Switch
          defaultChecked={Boolean(defaultValue)}
          onChange={handleChange}
        />
      }
      label="Required"
      sx={{ marginTop: 2, marginBottom: 1 }}
    />
  );
};

interface IFieldConfigProps {
  initialValues?: IFieldBase | null;
  handleChange(e: ChangeEvent): void;
  handleBlur(e: FocusEvent): void;
  errors: FormikErrors<IFieldBase>;
  touched: FormikTouched<IFieldBase>;
}
export const getFieldConfig = (
  fieldType: FIELD_TYPES,
  formikProps: IFieldConfigProps
) => {
  const { initialValues, handleChange, handleBlur, errors, touched } =
    formikProps;
  const getConfigProps = (attr: keyof IFieldBase): IConfigProps => {
    return {
      defaultValue: initialValues ? initialValues[attr] : undefined,
      handleChange,
      handleBlur,
      error: errors[attr],
      touched: !!touched[attr],
    };
  };

  switch (fieldType) {
    case FIELD_TYPES.TEXT_FIELD:
      return (
        <>
          <TitleConfig {...getConfigProps('title')} />
          <DescriptionConfig {...getConfigProps('description')} />
          <MaxLengthConfig {...getConfigProps('maxLength')} />
          <RequiredConfig {...getConfigProps('isRequired')} />
        </>
      );
    case FIELD_TYPES.NUMBER:
      return (
        <>
          <TitleConfig {...getConfigProps('title')} />
          <DescriptionConfig {...getConfigProps('description')} />
          <MinValueConfig {...getConfigProps('minValue')} />
          <MaxValueConfig {...getConfigProps('maxValue')} />
          <RequiredConfig {...getConfigProps('isRequired')} />
        </>
      );
    case FIELD_TYPES.EMAIL:
      return (
        <>
          <TitleConfig {...getConfigProps('title')} />
          <DescriptionConfig {...getConfigProps('description')} />
          <RequiredConfig {...getConfigProps('isRequired')} />
        </>
      );
    case FIELD_TYPES.DROPDOWN:
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

export const getFieldValidationSchema = (fieldType: FIELD_TYPES) => {
  let validators = {};

  switch (fieldType) {
    case FIELD_TYPES.TEXT_FIELD:
      validators = {
        title: yup.string().required(ERROR_MESSAGE_REQUIRED),
      };
      break;
    case FIELD_TYPES.NUMBER:
      validators = {
        title: yup.string().required(ERROR_MESSAGE_REQUIRED),
      };
      break;
    case FIELD_TYPES.EMAIL:
      validators = {
        title: yup.string().required(ERROR_MESSAGE_REQUIRED),
      };
      break;
    case FIELD_TYPES.DROPDOWN:
      validators = {
        title: yup.string().required(ERROR_MESSAGE_REQUIRED),
        options: yup.string().required(ERROR_MESSAGE_REQUIRED),
      };
      break;
  }

  return yup.object(validators);
};

export const TEXT_FIELD_INITIAL_VALUES = {
  title: '',
  description: '',
  maxLength: null,
  isRequired: false,
};
export const NUMBER_INITIAL_VALUES = {
  title: '',
  description: '',
  minValue: null,
  maxValue: null,
  isRequired: false,
};
export const EMAIL_INITIAL_VALUES = {
  title: '',
  description: '',
  isRequired: false,
};
export const DROPDOWN_INITIAL_VALUES = {
  title: '',
  description: '',
  options: '',
  isRequired: false,
};

export const getInitialValues = (
  fieldType: FIELD_TYPES,
  initialValues?: IFieldBase | null
): IFieldBase => {
  if (!initialValues) {
    switch (fieldType) {
      case FIELD_TYPES.TEXT_FIELD:
        return TEXT_FIELD_INITIAL_VALUES;
      case FIELD_TYPES.NUMBER:
        return NUMBER_INITIAL_VALUES;
      case FIELD_TYPES.EMAIL:
        return EMAIL_INITIAL_VALUES;
      case FIELD_TYPES.DROPDOWN:
        return DROPDOWN_INITIAL_VALUES;
    }
  }

  return initialValues;
};
