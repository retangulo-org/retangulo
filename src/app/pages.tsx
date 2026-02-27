import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import './index.css';
import Root from './layout';
import Home from '../pages/Home';
import Options from '../pages/Options';
import About from '../pages/About';
import BlogList from '../pages/blog/BlogList';
import BlogPost from '../pages/blog/BlogPost';
import Error from '../pages/Error';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/options" element={<Options />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/*" element={<Error />} />
    </Route>,
  ),
);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
