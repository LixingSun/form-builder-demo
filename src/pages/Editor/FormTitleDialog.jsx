import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

export default function FormTitleDialog({
  open,
  onClose,
  onSubmit,
  initialValues,
}) {
  return (
    <Dialog
      data-testid="form-title-dialog"
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
          onSubmit(formJson);
        },
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
