import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import {
  getFieldConfig,
  getFieldValidationSchema,
  getInitialValues,
} from './fieldConfig';
import { toCamelCase } from '@/utils/stringUtils';
import { useFormik } from 'formik';
import { FIELD_TYPES } from '@/constants/fieldConstants';
import { IField, IFieldBase } from '@/context/SchemaContext';

interface IFieldDialog {
  open: boolean;
  fieldId: string;
  fieldType: FIELD_TYPES;
  fieldDisplayName: string;
  onClose(): void;
  onSubmit(field: IField): void;
  initialValues?: IFieldBase | null;
}
const FieldDialog: React.FC<IFieldDialog> = ({
  open,
  fieldId,
  fieldType,
  fieldDisplayName,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const { handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik<IFieldBase>({
      initialValues: getInitialValues(fieldType, initialValues),
      validationSchema: getFieldValidationSchema(fieldType),
      onSubmit: (values) => {
        const formattedValues = {
          id: fieldId,
          type: fieldType,
          key: toCamelCase(values.title),
          ...values,
        };
        onSubmit(formattedValues);
      },
    });

  return (
    <Dialog
      data-testid="field-dialog"
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        noValidate: true,
        autoComplete: 'off',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>
        {!initialValues ? 'Create' : 'Edit'} Field - {fieldDisplayName}
      </DialogTitle>
      <DialogContent>
        {getFieldConfig(fieldType, {
          initialValues,
          handleChange,
          handleBlur,
          errors,
          touched,
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">{!initialValues ? 'Create' : 'Save'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FieldDialog;
