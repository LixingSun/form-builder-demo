import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/Editor/Editor';
import Preview from '@/pages/Preview/Preview';
import { SchemaProvider } from '@/context/SchemaContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/preview',
    element: <Preview />,
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
