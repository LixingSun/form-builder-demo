import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function FormTitleDialog({
  open,
  onClose,
  onSubmit,
  initialValues,
}) {
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
}

FormTitleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};
