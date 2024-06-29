/* eslint-disable no-unused-vars */

import './App.css'

import React,{ Suspense} from 'react'
import { SessionProvider } from './context/authContext'
import { useRoutes } from 'react-router-dom'
import { WorkspaceProvider } from './context/workspaceContext/WorkspaceContext'
import  routes  from './Routes/Routes'





function App() {
  
  

  const routing = useRoutes(routes)
  

  return (
    <SessionProvider>
      <WorkspaceProvider>
          <Suspense fallback={<div>Loading...</div>}>
            {routing}
          </Suspense>
      </WorkspaceProvider>
    </SessionProvider>
  )
}

export default App