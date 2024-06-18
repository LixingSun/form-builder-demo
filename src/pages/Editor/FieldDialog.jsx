import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { getFieldConfig } from './fieldConfig';
import { toCamelCase } from '@/utils/stringUtils';

const formatFormJson = (formJson) => {
  let formattedFormJson = structuredClone(formJson);

  formattedFormJson = {
    ...formattedFormJson,
    isRequired: formJson.isRequired == 'on',
  };

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
  fieldType,
  fieldDisplayName,
  onClose,
  onSubmit,
  initialValues,
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
            id: initialValues ? initialValues.id : newFieldId,
            type: fieldType,
            key: toCamelCase(formJson.title),
            ...formJson,
          });
          onSubmit(formattedFormJson);
        },
      }}
    >
      <DialogTitle>
        {!initialValues ? 'Create' : 'Edit'} Field - {fieldDisplayName}
      </DialogTitle>
      <DialogContent>{getFieldConfig(fieldType, initialValues)}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">{!initialValues ? 'Create' : 'Save'}</Button>
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
  initialValues: PropTypes.object,
};
