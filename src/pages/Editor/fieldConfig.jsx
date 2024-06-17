import { TextField, FormControlLabel, Switch } from '@mui/material';
import { FIELD_TYPES } from '@/constants/fieldConstants';
import PropTypes from 'prop-types';

function TitleConfig({ defaultValue }) {
  return (
    <TextField
      required
      margin="dense"
      id="field-title-config"
      name="title"
      label="Field Title"
      fullWidth
      variant="standard"
      defaultValue={defaultValue}
    />
  );
}
TitleConfig.propTypes = {
  defaultValue: PropTypes.string,
};

function DescriptionConfig({ defaultValue }) {
  return (
    <TextField
      margin="dense"
      id="field-description-config"
      name="description"
      label="Field Description"
      fullWidth
      variant="standard"
      defaultValue={defaultValue}
    />
  );
}
DescriptionConfig.propTypes = {
  defaultValue: PropTypes.string,
};

function MaxLengthConfig({ defaultValue }) {
  return (
    <TextField
      margin="dense"
      id="field-max-length-config"
      name="maxLength"
      label="Maximum Length"
      type="number"
      fullWidth
      variant="standard"
      defaultValue={defaultValue}
    />
  );
}
MaxLengthConfig.propTypes = {
  defaultValue: PropTypes.string,
};

function RequiredConfig({ defaultValue }) {
  return (
    <FormControlLabel
      name="isRequired"
      control={<Switch defaultChecked={defaultValue} />}
      label="Required"
      sx={{ marginTop: 2, marginBottom: 1 }}
    />
  );
}
RequiredConfig.propTypes = {
  defaultValue: PropTypes.bool,
};

export const getFieldConfig = (fieldType, initialValues) => {
  const getDefaultValue = (attr) => {
    if (!initialValues) return {};

    return { defaultValue: initialValues[attr] };
  };

  switch (fieldType) {
    case FIELD_TYPES.textField:
      return (
        <>
          <TitleConfig {...getDefaultValue('title')} />
          <DescriptionConfig {...getDefaultValue('description')} />
          <MaxLengthConfig {...getDefaultValue('maxLength')} />
          <RequiredConfig {...getDefaultValue('isRequired')} />
        </>
      );
  }
};
