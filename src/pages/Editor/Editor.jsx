import { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import { SchemaContext } from '@/context/SchemaContext';
import EditorMenu from './EditorMenu';
import EditorContent from './EditorContent';
import { Link } from 'react-router-dom';

export default function Editor() {
  const schema = useContext(SchemaContext);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Form Builder Demo
          </Typography>
          <Link to="preview">
            <Button
              endIcon={<PreviewIcon />}
              sx={{ color: 'primary.contrastText' }}
            >
              Preview
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#eeeeee',
        }}
      >
        <Grid container sx={{ flex: 1 }}>
          <Grid item xs={12} md={3} sx={{ p: 4, bgcolor: 'primary.light' }}>
            <EditorMenu />
          </Grid>

          <Grid item xs={12} md={9}>
            <EditorContent schema={schema} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
