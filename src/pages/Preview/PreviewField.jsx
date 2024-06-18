import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { FIELD_TYPES } from '@/constants/fieldConstants';

function PreviewTextField({ field, touched, error, handleChange, handleBlur }) {
  return (
    <TextField
      required={field.isRequired}
      placeholder={field.description}
      margin="dense"
      id={`field-${field.id}`}
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

export default function PreviewField({
  field,
  touched,
  error,
  handleChange,
  handleBlur,
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
};
