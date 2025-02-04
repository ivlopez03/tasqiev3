/* eslint-disable no-unused-vars */

import "./App.css";

import React, { Suspense, useState } from "react";
import { SessionProvider } from "./context/authContext";
import { useRoutes } from "react-router-dom";
import { WorkspaceProvider } from "./context/workspaceContext/WorkspaceContext";
import routes from "./Routes/Routes";

function App() {
  const routing = useRoutes(routes);
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);

  return (
    <div>
      <SessionProvider>
        <WorkspaceProvider>
          <Suspense fallback={<div>Loading...</div>}>{routing}</Suspense>
        </WorkspaceProvider>
      </SessionProvider>
    </div>
  );
}

export default App;
