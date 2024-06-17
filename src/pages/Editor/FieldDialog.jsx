import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';

import { getFieldConfig } from './fieldConfig';
import { v4 as uuidv4 } from 'uuid';

const formatFormJson = (formJson) => {
  let formattedFormJson = structuredClone(formJson);

  formattedFormJson = {
    ...formattedFormJson,
    isRequired: formJson.isRequired == 'on',
  };

  if ('maxLength' in formattedFormJson && formattedFormJson.maxLength == '') {
    formattedFormJson.maxLength = null;
  }
  return formattedFormJson;
};

export default function FieldDialog({
  open,
  fieldType,
  fieldDisplayName,
  onClose,
  onSubmit,
}) {
  const newFieldId = uuidv4();

  return (
    <Dialog
      data-testid="field-dialog"
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const formattedFormJson = formatFormJson({
            id: newFieldId,
            ...formJson,
          });
          onSubmit(formattedFormJson);
        },
      }}
    >
      <DialogTitle>Create Field - {fieldDisplayName}</DialogTitle>
      <DialogContent>{getFieldConfig(fieldType)}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Create</Button>
      </DialogActions>
    </Dialog>
  );
}

FieldDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  fieldType: PropTypes.string.isRequired,
  fieldDisplayName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
