import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { FIELD_TYPES } from '@/constants/fieldConstants';

function PreviewTextField({ field, touched, error, handleChange, handleBlur }) {
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
}
PreviewTextField.propTypes = {
  field: PropTypes.object.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

function PreviewNumberField({
  field,
  touched,
  error,
  handleChange,
  handleBlur,
}) {
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
}
PreviewNumberField.propTypes = {
  field: PropTypes.object.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

function PreviewEmailField({
  field,
  touched,
  error,
  handleChange,
  handleBlur,
}) {
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
}
PreviewEmailField.propTypes = {
  field: PropTypes.object.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

function PreviewDropdownField({
  field,
  touched,
  error,
  handleChange,
  setTouched,
}) {
  const options = field.options.split(',');

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
        {options.map((option) => (
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
}
PreviewDropdownField.propTypes = {
  field: PropTypes.object.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  setTouched: PropTypes.func.isRequired,
};

export default function PreviewField({
  field,
  touched,
  error,
  handleChange,
  handleBlur,
  setTouched,
}) {
  switch (field.type) {
    case FIELD_TYPES.textField:
      return (
        <PreviewTextField
          field={field}
          touched={touched}
          error={error}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      );
    case FIELD_TYPES.number:
      return (
        <PreviewNumberField
          field={field}
          touched={touched}
          error={error}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      );
    case FIELD_TYPES.email:
      return (
        <PreviewEmailField
          field={field}
          touched={touched}
          error={error}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      );
    case FIELD_TYPES.dropdown:
      return (
        <PreviewDropdownField
          field={field}
          touched={touched}
          error={error}
          handleChange={handleChange}
          setTouched={setTouched}
        />
      );
    default:
      throw Error('Unknown field type: ' + field.type);
  }
}

PreviewField.propTypes = {
  field: PropTypes.object.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  setTouched: PropTypes.func.isRequired,
};
