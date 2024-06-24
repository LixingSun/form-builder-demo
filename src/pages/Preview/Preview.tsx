import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { GitHub as GithubIcon } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { SchemaContext } from '@/context/SchemaContext';
import {
  ScreenLoadingContext,
  SCREEN_LOADING_ACTION_TYPE,
} from '@/context/ScreenLoadingContext';
import PreviewForm from './PreviewForm';

export const Preview: React.FC = () => {
  const { schema } = useContext(SchemaContext);
  const { isScreenLoadingDispatch } = useContext(ScreenLoadingContext);

  useEffect(() => {
    isScreenLoadingDispatch({
      type: SCREEN_LOADING_ACTION_TYPE.TOGGLE_SCREEN_LOADING,
      value: false,
    });
  }, [isScreenLoadingDispatch]);

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
            onClick={() => {
              isScreenLoadingDispatch({
                type: SCREEN_LOADING_ACTION_TYPE.TOGGLE_SCREEN_LOADING,
                value: true,
              });
            }}
          >
            Back to Edit
          </Button>
        </Toolbar>
      </AppBar>

      <PreviewForm schema={schema} />
    </Box>
  );
};
