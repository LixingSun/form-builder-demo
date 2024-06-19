import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SchemaProvider } from '@/context/SchemaContext';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { Editor } = await import('@/pages/Editor/Editor');
      return { Component: Editor };
    },
  },
  {
    path: '/preview',
    lazy: async () => {
      const { Preview } = await import('@/pages/Preview/Preview');
      return { Component: Preview };
    },
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <SchemaProvider>
      <RouterProvider router={router} />
    </SchemaProvider>
  </React.StrictMode>
);
