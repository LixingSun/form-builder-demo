import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';

export default function FieldDialog({ open, fieldType, onClose, onSubmit }) {
  return (
    <Dialog
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
      <DialogTitle>Create Field - {fieldType}</DialogTitle>
      <DialogContent>
        <TextField
          required
          margin="dense"
          id="field-title"
          name="fieldTitle"
          label="Field Title"
          fullWidth
          variant="standard"
        />
      </DialogContent>
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
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
