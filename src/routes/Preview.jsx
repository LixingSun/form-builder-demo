import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function Preview() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Form Builder Demo
        </Typography>
        <Button color="inherit" endIcon={<EditIcon />}>
          Back to Edit
        </Button>
      </Toolbar>
    </AppBar>
  );
}
