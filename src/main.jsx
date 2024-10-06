import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import Root from "./Root";
import Home from "./pages/Home";
import Play from "./components/Play";
import ErroPage from "./pages/error-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index default element={<Home />} />
      <Route path="/play/:type/:negative/:max" element={<Play />} />
      <Route path="/*" element={<ErroPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
