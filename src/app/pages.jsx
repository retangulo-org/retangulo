import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';

import './index.css';
import Root from './layout';
import Home from '../pages/Home';
import Options from '../pages/Options';
import BlogList from '../pages/blog/BlogList';
import BlogPost from '../pages/blog/BlogPost';
import Error from '../pages/Error';
import '../i18n';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route path="/" element={<Navigate to="/pt" replace />} />
      <Route path="/:lang" element={<Home />} />
      <Route path="/:lang/options" element={<Options />} />
      <Route path="/:lang/blog" element={<BlogList />} />
      <Route path="/:lang/blog/:slug" element={<BlogPost />} />
      <Route path="*" element={<Error />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
