import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  useParams,
} from 'react-router-dom';

import './index.css';
import Root from './layout';
import Options from '../pages/Options';
import Home from '../pages/Home';
import Error from '../pages/Error';
import '../i18n';
import i18n from '../i18n';

const SUPPORTED_LANGS = ['pt', 'en'];

const getLang = () => {
  const browserLang = i18n.language.split('-')[0];
  return SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'en';
};

function LangWrapper({ children }) {
  const { lang } = useParams();
  if (!SUPPORTED_LANGS.includes(lang)) {
    return <Navigate to={`/${getLang()}`} replace />;
  }
  return children;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route path="/" element={<Navigate to={`/${getLang()}`} replace />} />
      <Route
        path="/:lang"
        element={
          <LangWrapper>
            <Home />
          </LangWrapper>
        }
      />
      <Route
        path="/:lang/options"
        element={
          <LangWrapper>
            <Options />
          </LangWrapper>
        }
      />
      <Route path="*" element={<Error />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
