import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import './index.css';
import Root from './layout';
import Selector from '../pages/Selector';
import Play from '../pages/Play';
import Options from '../pages/Options';
import Ui from '../pages/Ui';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route index element={<Selector />} />
      <Route path="/jogar/:type/:mode/:mode_config/:negativo/:maximo" element={<Play />} />
      <Route path="/opcoes" element={<Options />} />
      <Route path="/ui" element={<Ui />} />
      <Route path="/*" element={<ErrorPage />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
