/* eslint-disable no-unused-vars */

import './App.css'

import React,{ Suspense} from 'react'
import { SessionProvider } from './context/authContext'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { WorkspaceProvider } from './context/workspaceContext/WorkspaceContext'
import  routes  from './Routes/Routes'



function App() {

  function AppRoutes(){
    return useRoutes(routes)
  }
  

  return (
    <SessionProvider>
      <WorkspaceProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </WorkspaceProvider>
    </SessionProvider>
  )
}

export default App