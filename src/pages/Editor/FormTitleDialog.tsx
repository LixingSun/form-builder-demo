import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { IFormSettings } from '@/context/SchemaContext';

interface IFormTitleDialogProps {
  open: boolean;
  onClose(): void;
  onSubmit(field: IFormSettings): void;
  initialValues: IFormSettings;
}

const FormTitleDialog: React.FC<IFormTitleDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const { handleSubmit, handleChange, handleBlur, errors, touched } = useFormik(
    {
      initialValues,
      validationSchema: yup.object({
        title: yup.string().required('This field is required.'),
        description: yup.string().required('This field is required.'),
      }),
      onSubmit: (values) => {
        onSubmit(values);
      },
    }
  );
  return (
    <Dialog
      data-testid="form-title-dialog"
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
      <DialogTitle>Configure Form</DialogTitle>
      <DialogContent>
        <TextField
          required
          margin="dense"
          id="form-title-config"
          data-testid="form-title-config"
          name="title"
          label="Title"
          fullWidth
          variant="standard"
          defaultValue={initialValues.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && Boolean(errors.title)}
          helperText={touched.title && errors.title}
        />
        <TextField
          required
          margin="dense"
          id="form-description-config"
          data-testid="form-description-config"
          name="description"
          label="Description"
          fullWidth
          multiline
          variant="standard"
          defaultValue={initialValues.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.description && Boolean(errors.description)}
          helperText={touched.description && errors.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormTitleDialog;
