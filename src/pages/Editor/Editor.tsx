import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Grid } from '@mui/material';
import {
  Preview as PreviewIcon,
  SettingsBackupRestore as ResetIcon,
  GitHub as GithubIcon,
} from '@mui/icons-material';
import { SchemaContext, SCHEMA_ACTION_TYPE } from '@/context/SchemaContext';
import EditorMenu from './EditorMenu';
import EditorContent from './EditorContent';
import { useScreenLoading } from '@/hooks/useScreenLoading';

export function Editor() {
  const { schema, schemaDispatch } = useContext(SchemaContext);
  const { toggleOnScreenLoading } = useScreenLoading();

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
            endIcon={<ResetIcon />}
            sx={{ color: 'primary.contrastText' }}
            onClick={() => {
              schemaDispatch({
                type: SCHEMA_ACTION_TYPE.RESET_SCHEMA,
              });
            }}
          >
            Reset
          </Button>
          <Button
            component={Link}
            to="/preview"
            endIcon={<PreviewIcon />}
            sx={{ color: 'primary.contrastText' }}
            onClick={() => {
              toggleOnScreenLoading();
            }}
          >
            Preview
          </Button>
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
