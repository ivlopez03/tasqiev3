/* eslint-disable no-unused-vars */

import "./App.css";

import React, { Suspense, useState } from "react";
import { SessionProvider } from "./context/authContext";
import { useRoutes } from "react-router-dom";
import { WorkspaceProvider } from "./context/workspaceContext/WorkspaceContext";
import { BacklogProvider } from "./context/backlogContext/BacklogContext";
import routes from "./Routes/Routes";

function App() {
  const routing = useRoutes(routes);
 

  return (
    <div>
      <SessionProvider>
        <WorkspaceProvider>
          <BacklogProvider>
            <Suspense fallback={<div>Loading...</div>}>{routing}</Suspense>
          </BacklogProvider>
        </WorkspaceProvider>
      </SessionProvider>
    </div>
  );
}

export default App;
