import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { FIELD_TYPES } from '@/constants/fieldConstants';
import { IField } from '@/context/SchemaContext';
import { ChangeEvent, FC, FocusEventHandler } from 'react';
import { FormikTouched, FormikValues } from 'formik';

interface IPreviewFieldPropsBase {
  field: IField;
  touched: boolean;
  error?: string;
  handleChange(e: ChangeEvent | SelectChangeEvent): void;
}
export interface IPreviewFieldProps extends IPreviewFieldPropsBase {
  handleBlur: FocusEventHandler;
  setTouched(touched: FormikTouched<FormikValues>): any;
}
interface IPreviewDefaultFieldProps extends IPreviewFieldPropsBase {
  handleBlur: FocusEventHandler;
}
interface IPreviewDropdownFieldProps extends IPreviewFieldPropsBase {
  setTouched(touched: FormikTouched<FormikValues>): any;
}

const PreviewTextField: FC<IPreviewDefaultFieldProps> = ({
  field,
  touched,
  error,
  handleChange,
  handleBlur,
}) => {
  return (
    <TextField
      required={field.isRequired}
      placeholder={field.description}
      margin="dense"
      id={`field-${field.id}`}
      data-testid={`field-${field.id}`}
      name={field.key}
      label={field.title}
      fullWidth
      variant="outlined"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched && Boolean(error)}
      helperText={touched && error}
    />
  );
};

const PreviewNumberField: FC<IPreviewDefaultFieldProps> = ({
  field,
  touched,
  error,
  handleChange,
  handleBlur,
}) => {
  return (
    <TextField
      required={field.isRequired}
      placeholder={field.description}
      margin="dense"
      type="number"
      id={`field-${field.id}`}
      data-testid={`field-${field.id}`}
      name={field.key}
      label={field.title}
      fullWidth
      variant="outlined"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched && Boolean(error)}
      helperText={touched && error}
    />
  );
};

const PreviewEmailField: FC<IPreviewDefaultFieldProps> = ({
  field,
  touched,
  error,
  handleChange,
  handleBlur,
}) => {
  return (
    <TextField
      required={field.isRequired}
      placeholder={field.description}
      margin="dense"
      id={`field-${field.id}`}
      data-testid={`field-${field.id}`}
      name={field.key}
      label={field.title}
      fullWidth
      variant="outlined"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched && Boolean(error)}
      helperText={touched && error}
    />
  );
};

const PreviewDropdownField: FC<IPreviewDropdownFieldProps> = ({
  field,
  touched,
  error,
  handleChange,
  setTouched,
}) => {
  const options = field.options?.split(',');

  return (
    <FormControl required={field.isRequired} margin="dense" fullWidth>
      <InputLabel>{field.title}</InputLabel>
      <Select
        data-testid={`field-${field.id}`}
        id={`field-${field.id}`}
        name={field.key}
        label={field.title}
        error={touched && Boolean(error)}
        onChange={handleChange}
        onClose={() => {
          setTimeout(() => {
            setTouched({ [field.key]: true });
          });
        }}
        defaultValue=""
      >
        {options?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText
        id={`field-${field.id}-helper-text`}
        data-testid={`field-${field.id}-helper-text`}
        error={touched && Boolean(error)}
      >
        {touched && error ? error : field.description}
      </FormHelperText>
    </FormControl>
  );
};

const PreviewField: React.FC<IPreviewFieldProps> = ({
  field,
  touched,
  error,
  handleChange,
  handleBlur,
  setTouched,
}) => {
  switch (field.type) {
    case FIELD_TYPES.TEXT_FIELD:
      return (
        <PreviewTextField
          field={field}
          touched={touched}
          error={error}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      );
    case FIELD_TYPES.NUMBER:
      return (
        <PreviewNumberField
          field={field}
          touched={touched}
          error={error}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      );
    case FIELD_TYPES.EMAIL:
      return (
        <PreviewEmailField
          field={field}
          touched={touched}
          error={error}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      );
    case FIELD_TYPES.DROPDOWN:
      return (
        <PreviewDropdownField
          field={field}
          touched={touched}
          error={error}
          handleChange={handleChange}
          setTouched={setTouched}
        />
      );
  }
};

export default PreviewField;
