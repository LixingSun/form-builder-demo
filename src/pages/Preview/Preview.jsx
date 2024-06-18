import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { SchemaContext } from '@/context/SchemaContext';
import PreviewForm from './PreviewForm';

export default function Preview() {
  const schema = useContext(SchemaContext);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Form Builder Demo
          </Typography>
          <Link to="/">
            <Button
              endIcon={<EditIcon />}
              sx={{ color: 'primary.contrastText' }}
            >
              Back to Edit
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      <PreviewForm schema={schema} />
    </Box>
  );
}
