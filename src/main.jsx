import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import './index.css';
import Root from './Root';
import Home from './pages/Home';
import Selector from './pages/Selector';
import Play from './components/Play';
import Ui from './pages/Ui';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/jogar" element={<Root />}>
        <Route index element={<Selector />} />
        <Route path="/jogar/:type/:time/:negativo/:maximo" element={<Play />} />
      </Route>
      <Route path="/ui" element={<Ui />} />
      <Route path="/*" element={<ErrorPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
