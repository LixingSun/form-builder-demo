import { TextField, FormControlLabel, Switch } from '@mui/material';
import { FIELD_TYPES } from '@/constants/fieldConstants';

function TitleConfig() {
  return (
    <TextField
      required
      margin="dense"
      id="field-title-config"
      name="title"
      label="Field Title"
      fullWidth
      variant="standard"
    />
  );
}

function DescriptionConfig() {
  return (
    <TextField
      margin="dense"
      id="field-description-config"
      name="description"
      label="Field Description"
      fullWidth
      variant="standard"
    />
  );
}

function MaxLengthConfig() {
  return (
    <TextField
      margin="dense"
      id="field-max-length-config"
      name="maxLength"
      label="Maximum Length"
      type="number"
      fullWidth
      variant="standard"
    />
  );
}

function RequiredConfig() {
  return (
    <FormControlLabel
      name="isRequired"
      control={<Switch />}
      label="Required"
      sx={{ marginTop: 2, marginBottom: 1 }}
    />
  );
}

export const getFieldConfig = (fieldType) => {
  switch (fieldType) {
    case FIELD_TYPES.textField:
      return (
        <>
          <TitleConfig />
          <DescriptionConfig />
          <MaxLengthConfig />
          <RequiredConfig />
        </>
      );
  }
};
