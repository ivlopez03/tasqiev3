
import './App.css'
import Sidebar from './components/Sidebar'
import { SessionProvider } from './hooks/authContext'
import { useRoutes } from 'react-router-dom'
import {routesArray} from './Routes/Routes'

function App() {

  let routesElement = useRoutes(routesArray)

  return (
    <SessionProvider>
      <div className='flex'>
        <Sidebar />
        <div className='w-full'>
          {routesElement}
        </div>
      </div>
    </SessionProvider>
  )
}

export default App