import { TextField, FormControlLabel, Switch } from '@mui/material';
import { FIELD_TYPES } from '@/constants/fieldConstants';
import PropTypes from 'prop-types';

function TitleConfig({ defaultValue }) {
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
      data-testid="field-description-config"
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
      data-testid="field-max-length-config"
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

function MaxValueConfig({ defaultValue }) {
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
    />
  );
}
MaxValueConfig.propTypes = {
  defaultValue: PropTypes.string,
};

function MinValueConfig({ defaultValue }) {
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
    />
  );
}
MinValueConfig.propTypes = {
  defaultValue: PropTypes.string,
};

function RequiredConfig({ defaultValue }) {
  return (
    <FormControlLabel
      name="isRequired"
      id="field-required-config"
      data-testid="field-required-config"
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
    case FIELD_TYPES.number:
      return (
        <>
          <TitleConfig {...getDefaultValue('title')} />
          <DescriptionConfig {...getDefaultValue('description')} />
          <MinValueConfig {...getDefaultValue('minValue')} />
          <MaxValueConfig {...getDefaultValue('maxValue')} />
          <RequiredConfig {...getDefaultValue('isRequired')} />
        </>
      );
    case FIELD_TYPES.email:
      return (
        <>
          <TitleConfig {...getDefaultValue('title')} />
          <DescriptionConfig {...getDefaultValue('description')} />
          <RequiredConfig {...getDefaultValue('isRequired')} />
        </>
      );
  }
};
