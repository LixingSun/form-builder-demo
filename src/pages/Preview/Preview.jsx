import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

export default function Preview() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Form Builder Demo
        </Typography>
        <Link to="/">
          <Button endIcon={<EditIcon />} sx={{ color: 'primary.contrastText' }}>
            Back to Edit
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
