import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { GitHub as GithubIcon } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { SchemaContext } from '@/context/SchemaContext';
import PreviewForm from './PreviewForm';

export function Preview() {
  const schema = useContext(SchemaContext);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
            Form Builder Demo
          </Typography>
          <a
            href="https://github.com/LixingSun/form-builder-demo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon
              sx={{ display: 'block', color: 'primary.contrastText' }}
            />
          </a>
          <div style={{ flexGrow: 1 }}></div>
          <Button
            component={Link}
            to="/"
            endIcon={<EditIcon />}
            sx={{ color: 'primary.contrastText' }}
          >
            Back to Edit
          </Button>
        </Toolbar>
      </AppBar>

      <PreviewForm schema={schema} />
    </Box>
  );
}
